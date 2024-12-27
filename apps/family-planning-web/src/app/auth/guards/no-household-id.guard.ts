import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { selectMyHouseholdId } from '../../households/state/households.selectors';
import { map, take, tap } from 'rxjs';

export const NoHouseholdIdGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectMyHouseholdId).pipe(
    take(1),
    map(householdId => !householdId),
    tap(noHouseholdId => {
      if (!noHouseholdId) {
        router.navigate(['command-centre']);
      }
    })
  );
};
