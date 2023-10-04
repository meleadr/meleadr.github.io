import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'desktop',
    loadComponent: () =>
      import('./desktop/desktop.component').then((m) => m.DesktopComponent),
  },
  { path: '', redirectTo: 'desktop', pathMatch: 'full' },
];
