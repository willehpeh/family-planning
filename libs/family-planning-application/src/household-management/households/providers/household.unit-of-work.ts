import { HouseholdRepositoryProvider } from './household.repository-provider';
import { UnitOfWork } from '../../../shared';

export interface HouseholdUnitOfWork extends UnitOfWork {
  transaction<T>(operation: (repositories: HouseholdRepositoryProvider) => Promise<T>): Promise<T>;
}
