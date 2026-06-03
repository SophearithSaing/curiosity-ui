import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { AuthApiService } from '../auth-api.service';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public readonly form = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  public readonly isPasswordVisible = signal(false);
  public readonly isSubmitting = signal(false);
  public readonly isLoginSuccessful = signal(false);
  public readonly errorMessage = signal('');

  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  /**
   * Toggles whether the password input renders plain text or masked text.
   * @returns {void}
   */
  public togglePasswordVisibility(): void {
    this.isPasswordVisible.update((isVisible: boolean): boolean => !isVisible);
  }

  /**
   * Validates the login form, submits credentials, and stores the JWT token.
   * @returns {void}
   */
  public submit(): void {
    this.form.markAllAsTouched();
    this.errorMessage.set('');

    if (this.form.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.authApi.login(this.form.getRawValue()).subscribe({
      next: (response): void => {
        this.authApi.storeAuthResponse(response);
        this.isLoginSuccessful.set(true);
        void this.router.navigateByUrl('/home');
      },
      error: (error: unknown): void => {
        this.errorMessage.set(this.getErrorMessage(error));
        this.isSubmitting.set(false);
      },
    });
  }

  /**
   * Resolves the password input type from the current visibility signal.
   * @returns {string}
   */
  public passwordInputType(): string {
    return this.isPasswordVisible() ? 'text' : 'password';
  }

  /**
   * Resolves the Material Symbol name for the password visibility action.
   * @returns {string}
   */
  public passwordIcon(): string {
    return this.isPasswordVisible() ? 'visibility' : 'visibility_off';
  }

  /**
   * Converts an unknown backend failure into a concise user-facing message.
   * @param {unknown} error - Unknown error emitted by the HTTP login request.
   * @returns {string}
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const responseMessage = this.readErrorMessage(error.error);

      if (responseMessage !== '') {
        return responseMessage;
      }
    }

    return 'Unable to sign in. Check your details and try again.';
  }

  /**
   * Reads the first usable message from a NestJS error response payload.
   * @param {unknown} error - Unknown backend error body to inspect safely.
   * @returns {string}
   */
  private readErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const message = error['message'];

      if (typeof message === 'string') {
        return message;
      }

      if (Array.isArray(message) && typeof message[0] === 'string') {
        return message[0];
      }
    }

    return '';
  }
}
