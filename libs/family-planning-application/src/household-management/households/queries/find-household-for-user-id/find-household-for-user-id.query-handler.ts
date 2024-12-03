import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindHouseholdForUserIdQuery } from './find-household-for-user-id.query';
import { HouseholdReadModel, HouseholdRepository } from '@family-planning/domain';

@QueryHandler(FindHouseholdForUserIdQuery)
export class FindHouseholdForUserIdQueryHandler implements IQueryHandler<FindHouseholdForUserIdQuery> {

  constructor(private readonly householdRepository: HouseholdRepository) {
  }

  async execute({ userId }: FindHouseholdForUserIdQuery): Promise<HouseholdReadModel | null> {
    return this.householdRepository.findByUserId(userId);
  }
}
