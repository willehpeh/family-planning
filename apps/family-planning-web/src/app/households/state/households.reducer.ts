import { LoadHouseholdInfoFailure, LoadHouseholdInfoSuccess } from './households.actions';
import { createReducer, on } from '@ngrx/store';

export const householdsFeatureKey = 'households';

export interface HouseholdsState {
  householdId: string | null;
  householdName: string | null;
}

export const initialState: HouseholdsState = {
  householdId: null,
  householdName: null,
};

export const householdsReducer = createReducer(
  initialState,
  on(LoadHouseholdInfoSuccess, (state, { householdId, householdName }): HouseholdsState => ({ ...state, householdId, householdName })),
  on(LoadHouseholdInfoFailure, (state): HouseholdsState => ({ ...state, householdId: null })),
);
