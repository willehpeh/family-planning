import { HouseholdMember } from '../entities';

export interface HouseholdMemberRepository {
  save(member: HouseholdMember): Promise<void>;
}
