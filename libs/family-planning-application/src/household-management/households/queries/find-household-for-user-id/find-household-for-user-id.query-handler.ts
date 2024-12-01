import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindHouseholdForUserIdQuery } from './find-household-for-user-id.query';
import { HouseholdRepository, HouseholdReadModel, HouseholdMemberRepository } from '@family-planning/domain';

@QueryHandler(FindHouseholdForUserIdQuery)
export class FindHouseholdForUserIdQueryHandler implements IQueryHandler<FindHouseholdForUserIdQuery> {

  constructor(private readonly householdRepository: HouseholdRepository,
              private readonly householdMemberRepository: HouseholdMemberRepository) {
  }

  async execute({ userId }: FindHouseholdForUserIdQuery): Promise<HouseholdReadModel> {
    const householdMember = await this.householdMemberRepository.findByUserId(userId);
    return this.householdRepository.findByMemberId(householdMember.id);
  }
}
