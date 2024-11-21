import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { LoadUserInfo, LoadUserInfoFailure, LoadUserInfoSuccess } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  loadUserInfoOnBootstrap$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => LoadUserInfo())
  ));

  loadUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfo),
    switchMap(() => this.authService.userInfo().pipe(
      map(({ user }) => LoadUserInfoSuccess({ user })),
      catchError(() => of(LoadUserInfoFailure()))
    )),
  ));

  redirectToDisclaimer$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoSuccess),
    map(() => this.router.navigate(['/disclaimer']))
  ), { dispatch: false });

  redirectToLogin$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoFailure),
    map(() => this.authService.redirectToLogin())
  ), { dispatch: false });

}
