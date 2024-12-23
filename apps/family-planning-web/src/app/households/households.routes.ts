import { Routes } from '@angular/router';
import { NoHouseholdIdGuard } from '../auth/guards/no-household-id.guard';

export const householdsRoutes: Routes = [
  {
    path: 'new',
    canActivate: [NoHouseholdIdGuard],
    loadComponent: () => import('./new-household/new-household.component').then(m => m.NewHouseholdComponent)
  },
  {
    path: 'my-household',
    loadComponent: () => import('./my-household/my-household.component').then(m => m.MyHouseholdComponent)
  }
]
