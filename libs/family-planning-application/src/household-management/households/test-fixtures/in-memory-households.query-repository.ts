import { HouseholdReadModel, HouseholdSnapshot, HouseholdsQueryRepository } from '@family-planning/domain';


export class InMemoryHouseholdsQueryRepository implements HouseholdsQueryRepository {
  findHouseholdForMember(memberId: string): Promise<HouseholdReadModel> {
    return Promise.resolve(new HouseholdReadModel());
  }

  withSnaphsots(snapshots: HouseholdSnapshot[]): InMemoryHouseholdsQueryRepository {
    return this;
  }
}
