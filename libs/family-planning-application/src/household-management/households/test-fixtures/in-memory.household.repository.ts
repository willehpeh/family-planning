import { Household, HouseholdReadModel, HouseholdRepository, HouseholdSnapshot } from '@family-planning/domain';

export class InMemoryHouseholdRepository implements HouseholdRepository {

  private _householdsObj: Record<string, HouseholdSnapshot> = {};

  households() {
    return Object.values(this._householdsObj);
  }

  save(householdToSave: Household): Promise<void> {
    const snapshot = householdToSave.snapshot();
    this._householdsObj[snapshot.id()] = snapshot;
    return Promise.resolve();
  }

  async findByUserId(id: string): Promise<HouseholdReadModel> {
    const household = Object
      .values(this._householdsObj)
      .find(household => household.members()
        .some(member => member.userId() === id));
    if (!household) {
      throw new Error('Household not found');
    }
    return Promise.resolve({
      id: household.id(),
      name: household.name(),
    });
  }

  async findById(id: string): Promise<Household> {
    return this._householdsObj[id].toHousehold();
  }

  withSnapshots(snapshots: HouseholdSnapshot[]): InMemoryHouseholdRepository {
    snapshots.forEach(snapshot => this._householdsObj[snapshot.id()] = snapshot);
    return this;
  }
}
