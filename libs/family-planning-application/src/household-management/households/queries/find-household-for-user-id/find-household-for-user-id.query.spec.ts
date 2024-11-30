import { FindHouseholdForUserIdQuery } from './find-household-for-user-id.query';
import { FindHouseholdForUserIdQueryHandler } from './find-household-for-user-id-query.handler';
import { InMemoryHouseholdRepository } from '../../test-fixtures';

describe('FindHouseholdForUserIdQuery', () => {
  let query: FindHouseholdForUserIdQuery;
  let handler: FindHouseholdForUserIdQueryHandler;
  let userId: string;
  let householdRepository: InMemoryHouseholdRepository;

  beforeEach(() => {
    userId = '123';
    query = new FindHouseholdForUserIdQuery(userId);
    householdRepository = new InMemoryHouseholdRepository();
    handler = new FindHouseholdForUserIdQueryHandler(householdRepository);
  });

  it('should return the household for the given user ID', async () => {
    const household = await handler.execute(query);
    expect(household.id).toBe('123');
    expect(household.name).toBe('My household');
  });
});
