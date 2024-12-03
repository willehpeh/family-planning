import { createAction, props } from '@ngrx/store';
import { UserInfoDto } from '../types/user-info.dto';

export const LoadUserInfo = createAction('[@Effect loadUserInfoOnAcceptDisclaimer$] Load User Info');
export const LoadUserInfoSuccess = createAction(
  '[Auth API] Load User Info Success',
  props<{ userInfo: UserInfoDto }>()
);
export const LoadUserInfoFailure = createAction('[Auth API] Load User Info Failure');

