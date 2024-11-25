import { HouseholdReadModel } from '../read-models';

export abstract class HouseholdsQueryRepository {
  abstract findHouseholdForMember(memberId: string): Promise<HouseholdReadModel>;
}
