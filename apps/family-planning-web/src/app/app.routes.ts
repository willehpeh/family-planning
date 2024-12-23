import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { listsFeature } from './lists/state/lists.reducer';
import { provideEffects } from '@ngrx/effects';
import { ListsEffects } from './lists/state/lists.effects';
import { AuthGuard } from './auth/guards/auth.guard';
import { userInfoResolver } from './dashboard/resolvers/user-info.resolver';

export const appRoutes: Route[] = [
  { path: 'disclaimer', loadComponent: () => import('./disclaimer/disclaimer.component').then(m => m.DisclaimerComponent) },
  { path: 'dashboard',
    resolve: { userInfo: userInfoResolver },
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'lists',
    canActivate: [AuthGuard],
    providers: [
      provideState(listsFeature),
      provideEffects(ListsEffects)
    ],
    loadChildren: () => import('./lists/lists.routes').then(m => m.listRoutes) },
  { path: 'households',
    canActivate: [AuthGuard],
    loadChildren: () => import('./households/households.routes').then(m => m.householdsRoutes)
  },
  { path: '', redirectTo: 'disclaimer', pathMatch: 'full' },
  { path: '**', redirectTo: 'disclaimer' }
];
