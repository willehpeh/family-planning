import { HouseholdRepositoryProvider } from './household.repository-provider';
import { UnitOfWork } from '../../../shared';

export abstract class HouseholdUnitOfWork implements UnitOfWork {
  abstract transaction<T>(operation: (repositories: HouseholdRepositoryProvider) => Promise<T>): Promise<T>;
}
