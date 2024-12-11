import {
  Email,
  FirstName,
  HouseholdId,
  HouseholdMemberId,
  HouseholdMemberSnapshot,
  HouseholdName,
  HouseholdSnapshot, LastName, UserId
} from '@family-planning/domain';

export const TEST_HOUSEHOLD_ID = HouseholdId.new();
export const TEST_HOUSEHOLD_NAME = new HouseholdName('Test Household');
export const TEST_HOUSEHOLD_MEMBER_ID = HouseholdMemberId.new();
export const TEST_USER_ID = new UserId('test-user-id');

export const TEST_HOUSEHOLD_SNAPSHOT = new HouseholdSnapshot({
  id: TEST_HOUSEHOLD_ID,
  name: TEST_HOUSEHOLD_NAME,
  memberIds: [TEST_HOUSEHOLD_MEMBER_ID]
});

export const TEST_HOUSEHOLD_MEMBER_SNAPSHOT = new HouseholdMemberSnapshot(
  TEST_HOUSEHOLD_MEMBER_ID,
  TEST_USER_ID,
  TEST_HOUSEHOLD_ID,
  new LastName('test-last-name'),
  new FirstName('test-first-name'),
  new Email('test-email'),
);
