import { createAction, props } from '@ngrx/store';

export const LoadUserInfo = createAction('[@Effect loadUserInfoOnAcceptDisclaimer$] Load User Info');
export const LoadUserInfoSuccess = createAction(
  '[Auth API] Load User Info Success',
  props<{ user: unknown }>()
);
export const LoadUserInfoFailure = createAction('[Auth API] Load User Info Failure');
