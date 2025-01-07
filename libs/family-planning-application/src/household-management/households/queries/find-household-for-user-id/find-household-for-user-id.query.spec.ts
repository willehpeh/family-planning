import { FindHouseholdForUserIdQuery, FindHouseholdForUserIdQueryHandler } from './';
import {
  InMemoryHouseholdRepository,
  TEST_HOUSEHOLD_ID,
  TEST_HOUSEHOLD_NAME,
  TEST_HOUSEHOLD_SNAPSHOT,
  TEST_USER_ID
} from '../../test-fixtures';

describe('FindHouseholdForUserIdQuery', () => {
  let query: FindHouseholdForUserIdQuery;
  let handler: FindHouseholdForUserIdQueryHandler;
  let userId: string;
  let householdRepository: InMemoryHouseholdRepository;

  beforeEach(() => {
    userId = TEST_USER_ID.value();
    query = new FindHouseholdForUserIdQuery(userId);
    householdRepository = new InMemoryHouseholdRepository().withSnapshots([TEST_HOUSEHOLD_SNAPSHOT()]);
    handler = new FindHouseholdForUserIdQueryHandler(householdRepository);
  });

  describe('Given the user already has a household', () => {

    it('should return the household for the given user ID', async () => {
      const household = await handler.execute(query);
      expect(household).not.toBeNull();
    });

    it('should return the household with the correct id', async () => {
      const household = await handler.execute(query);
      expect(household?.id).toBe(TEST_HOUSEHOLD_ID.value());
    });

    it('should return the household with the correct name', async () => {
      const household = await handler.execute(query);
      expect(household?.name).toBe(TEST_HOUSEHOLD_NAME.value());
    });
  });

});
