import { createAction, props } from '@ngrx/store';

export const LoadUserInfo = createAction('[@Effect loadUserInfoOnAcceptDisclaimer$] Load User Info');
export const LoadUserInfoSuccess = createAction(
  '[Auth API] Load User Info Success',
  props<{ user: unknown }>()
);
export const LoadUserInfoFailure = createAction('[Auth API] Load User Info Failure');

export const LoadHouseholdInfo = createAction('[@Effect loadHouseholdInfoOnLoadUserInfoSuccess$] Load Household Info');
export const LoadHouseholdInfoSuccess = createAction(
  '[Household API] Load Household Info Success',
  props<{ householdId: string, householdName: string }>()
);
export const LoadHouseholdInfoFailure = createAction('[Household API] Load Household Info Failure');
