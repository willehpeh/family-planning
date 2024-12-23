import { HouseholdMemberInfo } from './household-member-info';

export type HouseholdInfo = {
  id: string;
  name: string;
  members: HouseholdMemberInfo[]
  pendingMembers: HouseholdMemberInfo[]
}
