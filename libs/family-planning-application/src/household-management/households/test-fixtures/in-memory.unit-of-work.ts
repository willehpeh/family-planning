import { HouseholdRepositoryProvider, HouseholdUnitOfWork } from '../providers';
import { InMemoryHouseholdRepository } from './in-memory.household.repository';
import { InMemoryHouseholdMemberRepository } from './in-memory.household-member.repository';

export class InMemoryUnitOfWork implements HouseholdUnitOfWork {

  constructor(private householdCommandRepository: InMemoryHouseholdRepository,
              private householdMemberRepository: InMemoryHouseholdMemberRepository) {
  }

  async transaction<T>(operation: (repositories: HouseholdRepositoryProvider) => Promise<T>): Promise<T> {
    const repositories: HouseholdRepositoryProvider = {
      householdRepository: () => this.householdCommandRepository,
    };
    return operation(repositories);
  }
}
