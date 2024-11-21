import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { LoadUserInfo, LoadUserInfoFailure, LoadUserInfoSuccess } from './auth.actions';
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

  loadUserInfoOnAcceptDisclaimer$ = createEffect(() => this.actions$.pipe(
    ofType(AcceptDisclaimer),
    concatLatestFrom(() => this.store.select(selectAuthenticated)),
    filter(([_, authenticated]) => !authenticated),
    map(() => LoadUserInfo())
  ));

  loadUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfo),
    switchMap(() => this.authService.userInfo().pipe(
      map(({ user }) => LoadUserInfoSuccess({ user })),
      catchError(() => of(LoadUserInfoFailure()))
    )),
  ));

  redirectToDashboard$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoSuccess),
    map(() => this.router.navigate(['/dashboard']))
  ), { dispatch: false });

  redirectToLogin$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoFailure),
    map(() => this.authService.redirectToLogin())
  ), { dispatch: false });

}
