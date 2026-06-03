import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthResponse, LoginRequest, RegisterRequest } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  /**
   * Sends validated login credentials to the backend auth endpoint.
   * @param {LoginRequest} request - Email and password accepted by `POST /auth/login`.
   * @returns {Observable<AuthResponse>}
   */
  public login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, request);
  }

  /**
   * Sends account registration credentials to the backend auth endpoint.
   * @param {RegisterRequest} request - Username, email, and password accepted by `POST /auth/register`.
   * @returns {Observable<AuthResponse>}
   */
  public register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/register`,
      request,
    );
  }

  /**
   * Persists the returned JWT access token for later authenticated requests.
   * @param {AuthResponse} response - Backend login response containing `access_token`.
   * @returns {void}
   */
  public storeAuthResponse(response: AuthResponse): void {
    localStorage.setItem('synaptic_token', response.access_token);
  }

  /**
   * Checks whether the browser has a non-expired JWT access token.
   * @returns {boolean}
   */
  public hasValidAuthToken(): boolean {
    const token = localStorage.getItem('synaptic_token');

    if (token === null) {
      return false;
    }

    const payload = this.readJwtPayload(token);

    if (payload === null) {
      return false;
    }

    const expiresAt = payload['exp'];

    if (typeof expiresAt !== 'number') {
      return true;
    }

    return expiresAt * 1000 > Date.now();
  }

  /**
   * Removes the stored JWT access token from the browser session.
   * @returns {void}
   */
  public clearAuthToken(): void {
    localStorage.removeItem('synaptic_token');
  }

  /**
   * Safely reads the decoded payload from a JWT access token.
   * @param {string} token - JWT access token to decode.
   * @returns {Record<string, unknown> | null}
   */
  private readJwtPayload(token: string): Record<string, unknown> | null {
    const payload = token.split('.')[1];

    if (payload === undefined) {
      return null;
    }

    try {
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(
        normalized.length + ((4 - (normalized.length % 4)) % 4),
        '=',
      );
      const decoded = atob(padded);
      const parsed: unknown = JSON.parse(decoded);

      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return null;
    }

    return null;
  }
}
