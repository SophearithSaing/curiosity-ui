import { Routes } from '@angular/router';

import { authGuard } from './auth.guard';
import { DesignSystemComponent } from './pages/design-system/design-system.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoggedInHomePageComponent } from './pages/logged-in-home-page/logged-in-home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'design-system',
    component: DesignSystemComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: LoggedInHomePageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
];
