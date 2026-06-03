import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthApiService } from '../auth/auth-api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  /**
   * Redirects unauthenticated visitors away from the signed-in workspace.
   * @returns {void}
   */
  public ngOnInit(): void {
    if (!this.authApi.hasAuthToken()) {
      void this.router.navigateByUrl('/login');
    }
  }

  /**
   * Removes local authentication state for the current browser session.
   * @returns {void}
   */
  public signOut(): void {
    this.authApi.clearAuthToken();
  }
}
