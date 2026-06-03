import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthApiService } from '../auth-api.service';

interface RegisterForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  public readonly form = new FormGroup<RegisterForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public readonly isPasswordVisible = signal(false);
  public readonly isConfirmPasswordVisible = signal(false);
  public readonly isSubmitting = signal(false);
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
   * Toggles whether the confirm password input shows plain or masked text.
   * @returns {void}
   */
  public toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible.update(
      (isVisible: boolean): boolean => !isVisible,
    );
  }

  /**
   * Validates the registration form and creates an authenticated account.
   * @returns {void}
   */
  public submit(): void {
    this.form.markAllAsTouched();
    this.errorMessage.set('');

    if (this.form.invalid || this.isSubmitting()) {
      return;
    }

    const formValue = this.form.getRawValue();

    if (formValue.password !== formValue.confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isSubmitting.set(true);
    this.authApi
      .register({
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
      })
      .subscribe({
        next: (response): void => {
          this.authApi.storeAuthResponse(response);
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
   * Resolves the confirm password input type from its visibility signal.
   * @returns {string}
   */
  public confirmPasswordInputType(): string {
    return this.isConfirmPasswordVisible() ? 'text' : 'password';
  }

  /**
   * Resolves the Material Symbol name for confirm password visibility.
   * @returns {string}
   */
  public confirmPasswordIcon(): string {
    return this.isConfirmPasswordVisible() ? 'visibility' : 'visibility_off';
  }

  /**
   * Converts an unknown backend failure into a concise user-facing message.
   * @param {unknown} error - Unknown error emitted by the HTTP registration request.
   * @returns {string}
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const responseMessage = this.readErrorMessage(error.error);

      if (responseMessage !== '') {
        return responseMessage;
      }
    }

    return 'Unable to create your account. Check your details and try again.';
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
