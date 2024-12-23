import { LoadHouseholdInfoFailure, LoadHouseholdInfoSuccess, StartInvitingNewMember } from './households.actions';
import { createReducer, on } from '@ngrx/store';
import { HouseholdInfo } from '../models/household-info';

export const householdsFeatureKey = 'households';

export interface HouseholdsState {
  myHousehold: HouseholdInfo | null;
  invitingNewMember: boolean;
}

export const initialState: HouseholdsState = {
  myHousehold: null,
  invitingNewMember: false,
};

export const householdsReducer = createReducer(
  initialState,
  on(LoadHouseholdInfoSuccess, (state, { myHousehold }): HouseholdsState => ({ ...state, myHousehold })),
  on(LoadHouseholdInfoFailure, (state): HouseholdsState => ({ ...state, myHousehold: null })),
  on(StartInvitingNewMember, (state): HouseholdsState => ({ ...state, invitingNewMember: true })),
);
