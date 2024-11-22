import { HouseholdReadModel } from '../read-models';
import { HouseholdMemberId } from '../value-objects';

export abstract class HouseholdsQueryRepository {
  abstract findHouseholdForMember(memberId: HouseholdMemberId): Promise<HouseholdReadModel>;
}
