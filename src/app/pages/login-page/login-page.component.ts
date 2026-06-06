import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthSessionService } from '../../auth-session.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public constructor(
    private readonly authSession: AuthSessionService,
    private readonly router: Router,
  ) {}

  /**
   * Prevents the test form post and navigates to the signed-in home page.
   */
  public onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.authSession.signIn();
    void this.router.navigate(['/home']);
  }
}
