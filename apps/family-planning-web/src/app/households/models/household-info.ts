import { HouseholdMemberInfo } from './household-member-info';

export class HouseholdInfo {
  id = '';
  name = '';
  members: HouseholdMemberInfo[] = [];
  pendingMembers: HouseholdMemberInfo[] = [];

  static null(): HouseholdInfo {
    return new HouseholdInfo();
  }
}
