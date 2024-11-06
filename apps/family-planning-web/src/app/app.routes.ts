import { Route } from '@angular/router';
import { listRoutes } from './lists/lists.routes';

export const appRoutes: Route[] = [
  { path: 'disclaimer', loadComponent: () => import('./disclaimer/disclaimer.component').then(m => m.DisclaimerComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  ...listRoutes,
  { path: '', redirectTo: 'disclaimer', pathMatch: 'full' },
  { path: '**', redirectTo: 'disclaimer' },
];
