import { Routes } from '@angular/router';

export const householdsRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./new-household/new-household.component').then(m => m.NewHouseholdComponent)
  }
]
