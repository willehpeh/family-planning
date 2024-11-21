import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { listsFeature } from './lists/state/lists.reducer';
import { provideEffects } from '@ngrx/effects';
import { ListsEffects } from './lists/state/lists.effects';
import { AuthGuard } from './auth/guards/auth.guard';

export const appRoutes: Route[] = [
  { path: 'disclaimer', loadComponent: () => import('./disclaimer/disclaimer.component').then(m => m.DisclaimerComponent) },
  { path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'lists',
    canActivate: [AuthGuard],
    providers: [
      provideState(listsFeature),
      provideEffects(ListsEffects)
    ],
    loadChildren: () => import('./lists/lists.routes').then(m => m.listRoutes) },
  { path: '', redirectTo: 'disclaimer', pathMatch: 'full' },
  { path: '**', redirectTo: 'disclaimer' }
];
