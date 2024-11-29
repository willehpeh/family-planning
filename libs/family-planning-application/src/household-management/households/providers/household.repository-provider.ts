import { HouseholdCommandRepository, HouseholdMemberRepository } from '@family-planning/domain';
import { RepositoryProvider } from '../../../shared';

export interface HouseholdRepositoryProvider extends RepositoryProvider {
  householdCommandRepository(): HouseholdCommandRepository;
  householdMemberRepository(): HouseholdMemberRepository;
}
