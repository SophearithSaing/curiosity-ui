import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthSessionService } from '../../auth-session.service';

@Component({
  selector: 'app-logged-in-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logged-in-home-page.component.html',
  styleUrl: './logged-in-home-page.component.scss',
})
export class LoggedInHomePageComponent {
  public constructor(
    private readonly authSession: AuthSessionService,
    private readonly router: Router,
  ) {}

  /**
   * Clears the temporary local session and returns to the landing page.
   */
  public logOut(): void {
    this.authSession.signOut();
    void this.router.navigate(['/']);
  }
}
