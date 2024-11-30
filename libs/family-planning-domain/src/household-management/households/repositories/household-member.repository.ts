import { HouseholdMember } from '../entities';
import { HouseholdMemberReadModel } from '../read-models';

export abstract class HouseholdMemberRepository {
  abstract save(member: HouseholdMember): Promise<void>;
  abstract findByUserId(userId: string): Promise<HouseholdMemberReadModel>;
}
