import { inject, Injectable, isDevMode } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { filter, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class DisclaimerEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  showDisclaimerOnStartup$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    filter(() => !isDevMode()),
    tap(() => this.router.navigate(['/disclaimer']))
  ), { dispatch: false });
}
