import { FindHouseholdForMemberQuery } from './find-household-for-member.query';
import { FindHouseholdForMemberQueryHandler } from './find-household-for-member.query-handler';
import { InMemoryHouseholdsQueryRepository } from '../test-fixtures/in-memory-households.query-repository';
import { HouseholdReadModel, HouseholdSnapshot } from '@family-planning/domain';
import { HouseholdMemberDto } from '../dtos/household-member.dto';

describe('FindHouseholdForMemberQuery', () => {
  let query: FindHouseholdForMemberQuery;
  let findHouseholdForMemberQueryHandler: FindHouseholdForMemberQueryHandler;
  let householdMemberDto: HouseholdMemberDto;
  let inMemoryHouseholdsRepository: InMemoryHouseholdsQueryRepository;

  beforeEach(() => {
    householdMemberDto = { householdMemberId: 'member_id' };
    query = new FindHouseholdForMemberQuery(householdMemberDto);
  });

  describe('Household exists for member', () => {
    beforeEach(() => {
      const HOUSEHOLD_SNAPSHOT = new HouseholdSnapshot();
      inMemoryHouseholdsRepository = new InMemoryHouseholdsQueryRepository().withSnaphsots([HOUSEHOLD_SNAPSHOT]);
    });

    it('should return the household read model for the member', async () => {
      const expected = new HouseholdReadModel();
      findHouseholdForMemberQueryHandler = new FindHouseholdForMemberQueryHandler(inMemoryHouseholdsRepository);
      const result = await findHouseholdForMemberQueryHandler.execute(query);
      expect(result).toEqual(expected);
    });
  });
});
