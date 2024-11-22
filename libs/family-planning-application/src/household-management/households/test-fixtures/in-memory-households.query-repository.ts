import {
  HouseholdMemberId,
  HouseholdReadModel,
  HouseholdSnapshot,
  HouseholdsQueryRepository
} from '@family-planning/domain';


export class InMemoryHouseholdsQueryRepository implements HouseholdsQueryRepository {

  private _households = new Map<string, HouseholdSnapshot>();

  findHouseholdForMember(memberId: HouseholdMemberId): Promise<HouseholdReadModel> {
    return Promise.resolve(new HouseholdReadModel(Array.from(this._households.values())[0]));
  }

  withSnaphsots(snapshots: HouseholdSnapshot[]): InMemoryHouseholdsQueryRepository {
    this._households = new Map(snapshots.map(snapshot => [snapshot.id(), snapshot]));
    return this;
  }
}
