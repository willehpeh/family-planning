import { HouseholdRepositoryProvider, HouseholdUnitOfWork } from '../providers';
import { InMemoryHouseholdCommandRepository } from './in-memory.household.command-repository';
import { InMemoryHouseholdMemberRepository } from './in-memory.household-member.repository';

export class InMemoryUnitOfWork implements HouseholdUnitOfWork {

  constructor(private householdCommandRepository: InMemoryHouseholdCommandRepository,
              private householdMemberRepository: InMemoryHouseholdMemberRepository) {
  }

  async transaction<T>(operation: (repositories: HouseholdRepositoryProvider) => Promise<T>): Promise<T> {
    const repositories: HouseholdRepositoryProvider = {
      householdCommandRepository: () => this.householdCommandRepository,
      householdMemberRepository: () => this.householdMemberRepository
    };
    return operation(repositories);
  }
}
