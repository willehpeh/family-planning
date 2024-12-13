import { HouseholdMemberReadModel } from '../read-models';

export abstract class HouseholdMemberRepository {
  abstract findByUserId(userId: string): Promise<HouseholdMemberReadModel | null>;
}
