import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoadUserInfo, LoadUserInfoFailure, LoadUserInfoSuccess, Logout } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
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

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(Logout),
    switchMap(() => this.authService.logout()),
    tap(() => this.router.navigate(['disclaimer']))
  ), { dispatch: false })

}
