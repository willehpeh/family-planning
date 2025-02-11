import { Routes } from '@angular/router';
import { NoHouseholdIdGuard } from '../auth/guards/no-household-id.guard';

export const householdsRoutes: Routes = [
  {
    path: 'new',
    data: {
      backButtonPath: 'command-centre',
    },
    canActivate: [NoHouseholdIdGuard],
    loadComponent: () => import('./new-household/new-household.component').then(m => m.NewHouseholdComponent)
  },
  {
    path: 'my-household',
    data: {
      backButtonPath: 'command-centre',
    },
    loadComponent: () => import('./my-household/my-household.component').then(m => m.MyHouseholdComponent)
  }
]
