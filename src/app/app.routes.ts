import { Routes } from '@angular/router';

import { DesignSystemComponent } from './pages/design-system/design-system.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'design-system',
    component: DesignSystemComponent,
  },
];
