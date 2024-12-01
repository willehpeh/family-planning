import { HouseholdRepository, HouseholdMemberRepository } from '@family-planning/domain';
import { RepositoryProvider } from '../../../shared';

export interface HouseholdRepositoryProvider extends RepositoryProvider {
  householdRepository(): HouseholdRepository;
  householdMemberRepository(): HouseholdMemberRepository;
}
