import { createFeatureSelector, createSelector } from '@ngrx/store';
import { householdsFeatureKey, HouseholdsState } from './households.reducer';
import { HouseholdInfo } from '../models/household-info';

export const selectHouseholdsState = createFeatureSelector<HouseholdsState>(householdsFeatureKey);
export const selectMyHousehold = createSelector(
  selectHouseholdsState,
  (state: HouseholdsState) => state.myHousehold
);
export const selectMyHouseholdId = createSelector(
  selectMyHousehold,
  (household: HouseholdInfo | null) => household?.id || ''
);
export const selectMyHouseholdName = createSelector(
  selectMyHousehold,
  (household: HouseholdInfo | null) => household?.name || ''
);
export const selectMyHouseholdMembers = createSelector(
  selectMyHousehold,
  (household: HouseholdInfo | null) => household?.members || []
);
export const selectMyHouseholdPendingMembers = createSelector(
  selectMyHousehold,
  (household: HouseholdInfo | null) => household?.pendingMembers || []
);
