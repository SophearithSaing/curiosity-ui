import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionService {
  private readonly storageKey = 'synaptic.authenticated';

  public readonly authenticated = signal(this.readSession());

  /**
   * Marks the temporary local session as authenticated.
   */
  public signIn(): void {
    this.authenticated.set(true);
    localStorage.setItem(this.storageKey, 'true');
  }

  /**
   * Clears the temporary local session.
   */
  public signOut(): void {
    this.authenticated.set(false);
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Reports whether the current temporary session is authenticated.
   */
  public isAuthenticated(): boolean {
    return this.authenticated();
  }

  /**
   * Reads the temporary session state from local storage.
   */
  private readSession(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}
