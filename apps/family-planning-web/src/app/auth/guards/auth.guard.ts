import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthenticated } from '../state/auth.selectors';
import { take, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectAuthenticated).pipe(
    take(1),
    tap((authenticated) => {
      if (!authenticated) {
        router.navigate(['dashboard']);
      }
    })
  );
};
