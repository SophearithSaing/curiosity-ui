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
   * Checks whether the browser has a stored JWT access token.
   * @returns {boolean}
   */
  public hasAuthToken(): boolean {
    return localStorage.getItem('synaptic_token') !== null;
  }

  /**
   * Removes the stored JWT access token from the browser session.
   * @returns {void}
   */
  public clearAuthToken(): void {
    localStorage.removeItem('synaptic_token');
  }
}
