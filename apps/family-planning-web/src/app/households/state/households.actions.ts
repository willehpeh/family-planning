import { createAction, props } from '@ngrx/store';
import { HouseholdInfo } from '../models/household-info';
import { MemberInvitationInfo } from '../models/member-invitation-info';

export const LoadHouseholdInfo = createAction('[@Effect loadHouseholdInfoOnLoadUserInfoSuccess$] Load Household Info');
export const LoadHouseholdInfoSuccess = createAction(
  '[Household API] Load Household Info Success',
  props<{ myHousehold: HouseholdInfo }>()
);
export const LoadHouseholdInfoFailure = createAction('[Household API] Load Household Info Failure');
export const CreateHousehold = createAction(
  '[NewHouseholdComponent] Create Household',
  props<{ householdName: string }>()
);
export const CreateHouseholdSuccess = createAction(
  '[Household API] Create Household Success',
);
export const CreateHouseholdFailure = createAction('[Household API] Create Household Failure');
export const StartInvitingNewMember = createAction('[MyHouseholdComponent] Start Inviting New Member');
export const InviteNewMember = createAction(
  '[MyHouseholdComponent] Invite New Member',
  props<{ info: MemberInvitationInfo }>()
);
export const InviteNewMemberSuccess = createAction(
  '[Household API] Invite New Member Success',
);
export const InviteNewMemberFailure = createAction('[Household API] Invite New Member Failure');
