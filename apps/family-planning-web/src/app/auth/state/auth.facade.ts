import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { UserInfoDto } from '../types/user-info.dto';
import { LoadUserInfo, Logout } from './auth.actions';
import { selectUserInfo } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly store = inject(Store);

  userInfo(): Observable<UserInfoDto> {
    this.store.dispatch(LoadUserInfo());
    return this.store.select(selectUserInfo).pipe(
      filter(userInfo => !!userInfo)
    );
  }

  logout(): void {
    this.store.dispatch(Logout());
  }
}
