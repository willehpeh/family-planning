import {
  HouseholdMemberId,
  HouseholdReadModel,
  HouseholdSnapshot,
  HouseholdsQueryRepository
} from '@family-planning/domain';


export class InMemoryHouseholdsQueryRepository implements HouseholdsQueryRepository {
  findHouseholdForMember(memberId: HouseholdMemberId): Promise<HouseholdReadModel> {
    return Promise.resolve(new HouseholdReadModel());
  }

  withSnaphsots(snapshots: HouseholdSnapshot[]): InMemoryHouseholdsQueryRepository {
    return this;
  }
}
