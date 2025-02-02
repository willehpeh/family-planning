import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, tap } from 'rxjs';
import { UserInfoDto } from '../types/user-info.dto';
import { LoadUserInfo, Logout } from './auth.actions';
import { selectAuthenticated, selectUserGivenName, selectUserInfo } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly store = inject(Store);

  authenticated(): Signal<boolean> {
    return this.store.selectSignal(selectAuthenticated);
  }

  userInfo(): Observable<UserInfoDto> {
    return this.store.select(selectUserInfo).pipe(
      tap(userInfo => {
        if (!userInfo) {
          this.store.dispatch(LoadUserInfo());
        }
      }),
      filter(userInfo => !!userInfo)
    );
  }

  userGivenName(): Signal<string> {
    return this.store.selectSignal(selectUserGivenName);
  }

  logout(): void {
    this.store.dispatch(Logout());
  }
}
