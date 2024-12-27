import { UserInfoDto } from '../../auth/types/user-info.dto';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { AuthFacade } from '../../auth/state/auth.facade';

export const userInfoResolver: ResolveFn<UserInfoDto> = () => {
  return inject(AuthFacade).userInfo().pipe(
    take(1)
  )
};
