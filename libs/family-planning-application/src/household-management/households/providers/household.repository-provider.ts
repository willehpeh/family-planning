import { HouseholdRepository } from '@family-planning/domain';
import { RepositoryProvider } from '../../../shared';

export interface HouseholdRepositoryProvider extends RepositoryProvider {
  householdRepository(): HouseholdRepository;
}
