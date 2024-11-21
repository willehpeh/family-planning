import { inject, Injectable, isDevMode } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoadUserInfoSuccess } from '../auth/state/auth.actions';

@Injectable()
export class DisclaimerEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  showDisclaimerOnStartup$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoSuccess),
    filter(() => !isDevMode()),
    tap(() => this.router.navigate(['/disclaimer']))
  ), { dispatch: false });
}
