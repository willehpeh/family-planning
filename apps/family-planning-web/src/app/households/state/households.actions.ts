import { createAction, props } from '@ngrx/store';

export const LoadHouseholdInfo = createAction('[@Effect loadHouseholdInfoOnLoadUserInfoSuccess$] Load Household Info');
export const LoadHouseholdInfoSuccess = createAction(
  '[Household API] Load Household Info Success',
  props<{ householdId: string, householdName: string }>()
);
export const LoadHouseholdInfoFailure = createAction('[Household API] Load Household Info Failure');
