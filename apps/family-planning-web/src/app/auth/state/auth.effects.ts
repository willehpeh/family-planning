import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { LoadUserInfo, LoadUserInfoFailure, LoadUserInfoSuccess, Logout } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { AcceptDisclaimer } from '../../state/disclaimer.actions';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selectAuthenticated } from './auth.selectors';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  loadUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfo),
    switchMap(() => this.authService.loadUserInfo().pipe(
      map(({ userInfo }) => LoadUserInfoSuccess({ userInfo })),
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

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(Logout),
    switchMap(() => this.authService.logout()),
    tap(() => this.router.navigate(['disclaimer']))
  ), { dispatch: false })

}
