import { FindHouseholdForMemberQuery } from './find-household-for-member.query';
import { FindHouseholdForMemberQueryHandler } from './find-household-for-member.query-handler';
import { HOUSEHOLD_WITH_MEMBER, InMemoryHouseholdsQueryRepository } from '../test-fixtures';
import { HouseholdReadModel } from '@family-planning/domain';
import { HouseholdMemberDto } from '../dtos';

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
      inMemoryHouseholdsRepository = new InMemoryHouseholdsQueryRepository().withSnaphsots([HOUSEHOLD_WITH_MEMBER]);
    });

    it('should return the household read model for the member', async () => {
      const expected = new HouseholdReadModel(HOUSEHOLD_WITH_MEMBER);
      findHouseholdForMemberQueryHandler = new FindHouseholdForMemberQueryHandler(inMemoryHouseholdsRepository);
      const result = await findHouseholdForMemberQueryHandler.execute(query);
      expect(result).toEqual(expected);
    });
  });
});
