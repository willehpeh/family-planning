import { Household } from '../entities';

export abstract class HouseholdRepository {
  abstract save(household: Household): Promise<void>;
}
