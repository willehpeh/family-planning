import { Household } from '../entities';
import { HouseholdReadModel } from '../read-models';

export abstract class HouseholdRepository {
  abstract save(household: Household): Promise<void>;
  abstract findByMemberId(id: string): Promise<HouseholdReadModel>;
}
