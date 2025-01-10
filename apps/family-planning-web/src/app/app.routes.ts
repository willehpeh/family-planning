import { Route } from '@angular/router';
import { userInfoResolver } from './command-centre/resolvers/user-info.resolver';
import { AuthGuard } from './auth/guards/auth.guard';
import { LISTS_PROVIDERS } from './lists/lists.providers';
import { HOUSEHOLDS_PROVIDERS } from './households/households.providers';

export const appRoutes: Route[] = [
  {
    path: 'disclaimer',
    loadComponent: () => import('./disclaimer/disclaimer.component').then(m => m.DisclaimerComponent)
  },
  {
    path: 'command-centre',
    resolve: { userInfo: userInfoResolver },
    loadComponent: () => import('./command-centre/command-centre.component').then(m => m.CommandCentreComponent)
  },
  {
    path: 'lists',
    canActivate: [AuthGuard],
    providers: LISTS_PROVIDERS,
    loadChildren: () => import('./lists/lists.routes').then(m => m.listRoutes)
  },
  {
    path: 'households',
    canActivate: [AuthGuard],
    providers: HOUSEHOLDS_PROVIDERS,
    loadChildren: () => import('./households/households.routes').then(m => m.householdsRoutes)
  },
  {
    path: '',
    redirectTo: 'disclaimer',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'disclaimer',
    pathMatch: 'full'
  }
];
