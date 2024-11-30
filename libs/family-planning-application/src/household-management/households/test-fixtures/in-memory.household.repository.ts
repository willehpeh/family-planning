import { Household, HouseholdRepository, HouseholdSnapshot } from '@family-planning/domain';

export class InMemoryHouseholdRepository implements HouseholdRepository {

  private _households: HouseholdSnapshot[] = [];

  households() {
    return this._households;
  }

  save(household: Household): Promise<void> {
    this._households.push(household.snapshot());
    return Promise.resolve();
  }
}
