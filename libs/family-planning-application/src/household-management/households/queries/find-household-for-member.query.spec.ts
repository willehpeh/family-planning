import { FindHouseholdForMemberQuery } from './find-household-for-member.query';
import { FindHouseholdForMemberQueryHandler } from './find-household-for-member.query-handler';
import { InMemoryHouseholdsQueryRepository } from '../test-fixtures/in-memory-households.query-repository';
import { HouseholdReadModel, HouseholdSnapshot } from '@family-planning/domain';

describe('FindHouseholdForMemberQuery', () => {
  let query: FindHouseholdForMemberQuery;
  let findHouseholdForMemberQueryHandler: FindHouseholdForMemberQueryHandler;
  let inMemoryHouseholdsRepository: InMemoryHouseholdsQueryRepository;

  beforeEach(() => {
    query = new FindHouseholdForMemberQuery('member-id');
  });

  describe('Household exists for member', () => {
    beforeEach(() => {
      const HOUSEHOLD_SNAPSHOT = new HouseholdSnapshot();
      inMemoryHouseholdsRepository = new InMemoryHouseholdsQueryRepository().withSnaphsots([HOUSEHOLD_SNAPSHOT]);
    });

    it('should return the household for the member', async () => {
      const expected = new HouseholdReadModel();
      findHouseholdForMemberQueryHandler = new FindHouseholdForMemberQueryHandler(inMemoryHouseholdsRepository);
      const result = await findHouseholdForMemberQueryHandler.execute(query);
      expect(result).toEqual(expected);
    });
  });
});
