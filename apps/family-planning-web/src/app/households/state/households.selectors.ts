import { createFeatureSelector, createSelector } from '@ngrx/store';
import { householdsFeatureKey, HouseholdsState } from './households.reducer';

export const selectHouseholdsState = createFeatureSelector<HouseholdsState>(householdsFeatureKey);
export const selectHouseholdId = createSelector(
  selectHouseholdsState,
  (state: HouseholdsState) => state.householdId || ''
);
export const selectHouseholdName = createSelector(
  selectHouseholdsState,
  (state: HouseholdsState) => state.householdName || ''
);
