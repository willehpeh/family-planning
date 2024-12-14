import { UserInfoDto } from '../../auth/types/user-info.dto';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserInfo } from '../../auth/state/auth.selectors';
import { filter, take } from 'rxjs';
import { LoadUserInfo } from '../../auth/state/auth.actions';

export const userInfoResolver: ResolveFn<UserInfoDto> = () => {
  const store = inject(Store);
  store.dispatch(LoadUserInfo());
  return store.select(selectUserInfo).pipe(
    filter(info => !!info),
    take(1)
  );
};
