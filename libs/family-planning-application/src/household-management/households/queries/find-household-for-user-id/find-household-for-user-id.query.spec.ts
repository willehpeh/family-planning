import { FindHouseholdForUserIdQuery } from './find-household-for-user-id.query';
import { FindHouseholdForUserIdQueryHandler } from './find-household-for-user-id.query-handler';
import {
  InMemoryHouseholdMemberRepository,
  InMemoryHouseholdRepository,
  TEST_HOUSEHOLD_MEMBER_SNAPSHOT,
  TEST_HOUSEHOLD_SNAPSHOT,
  TEST_USER_ID
} from '../../test-fixtures';

describe('FindHouseholdForUserIdQuery', () => {
  let query: FindHouseholdForUserIdQuery;
  let handler: FindHouseholdForUserIdQueryHandler;
  let userId: string;
  let householdRepository: InMemoryHouseholdRepository;
  let householdMemberRepository: InMemoryHouseholdMemberRepository;

  beforeEach(() => {
    userId = TEST_USER_ID.value();
    query = new FindHouseholdForUserIdQuery(userId);
    householdMemberRepository = new InMemoryHouseholdMemberRepository().withSnapshots([TEST_HOUSEHOLD_MEMBER_SNAPSHOT]);
    householdRepository = new InMemoryHouseholdRepository(householdMemberRepository).withSnapshots([TEST_HOUSEHOLD_SNAPSHOT]);
    handler = new FindHouseholdForUserIdQueryHandler(householdRepository);
  });

  describe('Given the user already has a household', () => {

    it('should return the household for the given user ID', async () => {
      const household = await handler.execute(query);
      expect(household).not.toBeNull();
    });

    it('should return the household with the correct id', async () => {
      const household = await handler.execute(query);
      expect(household?.id).toBe(TEST_HOUSEHOLD_SNAPSHOT.id());
    });

    it('should return the household with the correct name', async () => {
      const household = await handler.execute(query);
      expect(household?.name).toBe(TEST_HOUSEHOLD_SNAPSHOT.name());
    });
  });

});
