import { HouseholdMemberDetails } from './household-member-details';

export type CreateNewHouseholdDto = {
  householdName: string,
  foundingMember: HouseholdMemberDetails,
};
