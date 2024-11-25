import { Household, HouseholdCommandRepository, HouseholdSnapshot } from '@family-planning/domain';

export class InMemoryHouseholdCommandRepository implements HouseholdCommandRepository {

  private _households: HouseholdSnapshot[] = [];

  households() {
    return this._households;
  }

  save(household: Household): Promise<void> {
    this._households.push(household.snapshot());
    return Promise.resolve();
  }
}
