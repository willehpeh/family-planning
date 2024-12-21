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
export const TEST_HOUSEHOLD_MEMBER_LAST_NAME = new LastName('Test');
export const TEST_HOUSEHOLD_MEMBER_FIRST_NAME = new FirstName('Test');
export const TEST_HOUSEHOLD_MEMBER_EMAIL = new Email('test@test.com');
export const TEST_USER_ID = new UserId('test-user-id');
export const TEST_PENDING_MEMBER_ID = HouseholdMemberId.new();
export const TEST_PENDING_MEMBER_LAST_NAME = new LastName('Pendingtest');
export const TEST_PENDING_MEMBER_FIRST_NAME = new FirstName('Pendingtest');
export const TEST_PENDING_MEMBER_EMAIL = new Email('pending@test.com');

export const TEST_HOUSEHOLD_MEMBER_SNAPSHOT = new HouseholdMemberSnapshot({
  id: TEST_HOUSEHOLD_MEMBER_ID,
  userId: TEST_USER_ID,
  householdId: TEST_HOUSEHOLD_ID,
  lastName: TEST_HOUSEHOLD_MEMBER_LAST_NAME,
  firstName: TEST_HOUSEHOLD_MEMBER_FIRST_NAME,
  email: TEST_HOUSEHOLD_MEMBER_EMAIL
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
    lastName: TEST_PENDING_MEMBER_LAST_NAME,
    firstName: TEST_PENDING_MEMBER_FIRST_NAME,
    email: TEST_PENDING_MEMBER_EMAIL,
    householdId: TEST_HOUSEHOLD_ID,
  })]
});
