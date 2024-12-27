import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { listsFeature } from './lists/state/lists.reducer';
import { provideEffects } from '@ngrx/effects';
import { ListsEffects } from './lists/state/lists.effects';
import { AuthGuard } from './auth/guards/auth.guard';
import { userInfoResolver } from './command-centre/resolvers/user-info.resolver';

export const appRoutes: Route[] = [
  { path: 'disclaimer', loadComponent: () => import('./disclaimer/disclaimer.component').then(m => m.DisclaimerComponent) },
  { path: 'command-centre',
    resolve: { userInfo: userInfoResolver },
    loadComponent: () => import('./command-centre/command-centre.component').then(m => m.CommandCentreComponent) },
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
