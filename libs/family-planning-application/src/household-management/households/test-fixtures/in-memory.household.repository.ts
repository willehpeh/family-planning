import { Household, HouseholdReadModel, HouseholdRepository, HouseholdSnapshot } from '@family-planning/domain';

export class InMemoryHouseholdRepository implements HouseholdRepository {

  private _households: HouseholdSnapshot[] = [];

  households() {
    return this._households;
  }

  save(household: Household): Promise<void> {
    this._households.push(household.snapshot());
    return Promise.resolve();
  }

  findByMemberId(id: string): Promise<HouseholdReadModel> {
    const household = this._households.find(household => household.memberIds().includes(id));
    if (!household) {
      throw new Error('Household not found!');
    }
    return Promise.resolve({
      id: household.id(),
      name: household.name()
    });
  }


  withSnapshots(snapshots: HouseholdSnapshot[]): InMemoryHouseholdRepository {
    this._households = snapshots;
    return this;
  }
}
