import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindHouseholdForUserIdQuery } from './find-household-for-user-id.query';
import { HouseholdRepository, HouseholdReadModel } from '@family-planning/domain';

@QueryHandler(FindHouseholdForUserIdQuery)
export class FindHouseholdForUserIdQueryHandler implements IQueryHandler<FindHouseholdForUserIdQuery> {

  constructor(private readonly householdRepository: HouseholdRepository) {
  }

  execute({ userId }: FindHouseholdForUserIdQuery): Promise<HouseholdReadModel> {
    return Promise.resolve({
      id: '123',
      name: 'My household',
    });
  }
}
