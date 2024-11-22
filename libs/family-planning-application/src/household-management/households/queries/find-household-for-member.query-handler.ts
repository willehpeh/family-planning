import { FindHouseholdForMemberQuery } from './find-household-for-member.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HouseholdMemberId, HouseholdReadModel, HouseholdsQueryRepository } from '@family-planning/domain';

@QueryHandler(FindHouseholdForMemberQuery)
export class FindHouseholdForMemberQueryHandler implements IQueryHandler<FindHouseholdForMemberQuery, HouseholdReadModel> {
  constructor(private readonly householdsRepository: HouseholdsQueryRepository) {}

  async execute(query: FindHouseholdForMemberQuery): Promise<HouseholdReadModel> {
    const memberId = new HouseholdMemberId(query.member.householdMemberId);
    return this.householdsRepository.findHouseholdForMember(memberId);
  }
}
