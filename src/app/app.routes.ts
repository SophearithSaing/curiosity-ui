import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home-page.component').then(
        (component) => component.HomePageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login-page/login-page.component').then(
        (component) => component.LoginPageComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register-page/register-page.component').then(
        (component) => component.RegisterPageComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
