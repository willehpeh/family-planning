import { HouseholdRepositoryProvider } from '../providers/household.repository-provider';
import { InMemoryHouseholdCommandRepository } from './in-memory.household.command-repository';
import { HouseholdUnitOfWork } from '../providers/household.unit-of-work';

export class InMemoryUnitOfWork implements HouseholdUnitOfWork {

  constructor(private householdCommandRepository: InMemoryHouseholdCommandRepository) {}

  async transaction<T>(operation: (repositories: HouseholdRepositoryProvider) => Promise<T>): Promise<T> {
    const repositories: HouseholdRepositoryProvider = {
      householdCommandRepository: () => this.householdCommandRepository
    };
    return operation(repositories);
  }
}
