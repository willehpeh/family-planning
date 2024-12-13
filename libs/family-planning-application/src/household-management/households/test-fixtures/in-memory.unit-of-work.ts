import { HouseholdRepositoryProvider, HouseholdUnitOfWork } from '../providers';
import { InMemoryHouseholdRepository } from './in-memory.household.repository';

export class InMemoryUnitOfWork implements HouseholdUnitOfWork {

  constructor(private householdCommandRepository: InMemoryHouseholdRepository) {
  }

  async transaction<T>(operation: (repositories: HouseholdRepositoryProvider) => Promise<T>): Promise<T> {
    const repositories: HouseholdRepositoryProvider = {
      householdRepository: () => this.householdCommandRepository,
    };
    return operation(repositories);
  }
}
