import {
  Email,
  FirstName,
  HouseholdId,
  HouseholdMemberId,
  HouseholdMemberSnapshot,
  HouseholdName,
  HouseholdSnapshot, LastName, PendingHouseholdMember, UserId
} from '@family-planning/domain';

export const TEST_HOUSEHOLD_ID = HouseholdId.new();
export const TEST_HOUSEHOLD_NAME = new HouseholdName('Test Household');
export const TEST_HOUSEHOLD_MEMBER_ID = HouseholdMemberId.new();
export const TEST_USER_ID = new UserId('test-user-id');
export const TEST_PENDING_MEMBER_ID = HouseholdMemberId.new();

export const TEST_HOUSEHOLD_MEMBER_SNAPSHOT = new HouseholdMemberSnapshot({
  id: TEST_HOUSEHOLD_MEMBER_ID,
  userId: TEST_USER_ID,
  householdId: TEST_HOUSEHOLD_ID,
  lastName: new LastName('Test'),
  firstName: new FirstName('Test'),
  email: new Email('test@test.com')
});

export const TEST_HOUSEHOLD_SNAPSHOT = new HouseholdSnapshot({
  id: TEST_HOUSEHOLD_ID,
  name: TEST_HOUSEHOLD_NAME,
  members: [TEST_HOUSEHOLD_MEMBER_SNAPSHOT],
  pendingMembers: []
});

export const TEST_HOUSEHOLD_SNAPSHOT_WITH_PENDING_MEMBER = new HouseholdSnapshot({
  id: TEST_HOUSEHOLD_ID,
  name: TEST_HOUSEHOLD_NAME,
  members: [TEST_HOUSEHOLD_MEMBER_SNAPSHOT],
  pendingMembers: [new PendingHouseholdMember({
    id: TEST_PENDING_MEMBER_ID,
    lastName: new LastName('Test'),
    firstName: new FirstName('Test'),
    email: new Email('pending@test.com'),
    householdId: TEST_HOUSEHOLD_ID,
  })]
});
