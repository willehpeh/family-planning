import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import {
  LoadHouseholdInfo, LoadHouseholdInfoFailure,
  LoadHouseholdInfoSuccess,
  LoadUserInfo,
  LoadUserInfoFailure,
  LoadUserInfoSuccess
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AcceptDisclaimer } from '../../state/disclaimer.actions';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selectAuthenticated } from './auth.selectors';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  loadHouseholdIdOnLoadUserInfoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoSuccess),
    map(() => LoadHouseholdInfo())
  ));

  loadHouseholdInfo$ = createEffect(() => this.actions$.pipe(
    ofType(LoadHouseholdInfo),
    switchMap(() => this.authService.loadHouseholdId().pipe(
      map(({ householdId, householdName }) => LoadHouseholdInfoSuccess({ householdId, householdName})),
      catchError(() => of(LoadHouseholdInfoFailure()))
    ))
  ));

  navigateToDashboardOnLoadHouseholdInfoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoadHouseholdInfoSuccess),
    map(() => this.router.navigate(['/dashboard']))
  ), { dispatch: false });

  navigateToNewHouseholdPageOnLoadHouseholdInfoFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LoadHouseholdInfoFailure),
    map(() => this.router.navigate(['/new-household']))
  ), { dispatch: false });

  loadUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfo),
    switchMap(() => this.authService.loadUserInfo().pipe(
      map(({ user }) => LoadUserInfoSuccess({ user })),
      catchError(() => of(LoadUserInfoFailure()))
    )),
  ));

  redirectToLogin$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoFailure),
    map(() => this.authService.redirectToLogin())
  ), { dispatch: false });

  loadUserInfoOnAcceptDisclaimer$ = createEffect(() => this.actions$.pipe(
    ofType(AcceptDisclaimer),
    concatLatestFrom(() => this.store.select(selectAuthenticated)),
    filter(([_, authenticated]) => !authenticated),
    map(() => LoadUserInfo())
  ));

}
