import { Household } from '../entities';

export abstract class HouseholdCommandRepository {
  abstract save(household: Household): Promise<void>;
}
