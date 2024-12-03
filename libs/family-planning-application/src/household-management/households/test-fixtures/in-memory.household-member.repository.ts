import {
  HouseholdMember,
  HouseholdMemberReadModel,
  HouseholdMemberRepository,
  HouseholdMemberSnapshot
} from '@family-planning/domain';

export class InMemoryHouseholdMemberRepository implements HouseholdMemberRepository {

  private _members = new Map<string, HouseholdMemberSnapshot>();

  save(member: HouseholdMember): Promise<void> {
    this._members.set(member.snapshot().id(), member.snapshot());
    return Promise.resolve();
  }

  members(): HouseholdMemberSnapshot[] {
    return Array.from(this._members.values());
  }

  findByUserId(userId: string): Promise<HouseholdMemberReadModel> {
    const memberWithUserId = Array.from(this._members.values()).find(member => member.userId() === userId);
    if (!memberWithUserId) {
      return Promise.reject();
    }
    return Promise.resolve({
      id: memberWithUserId.id(),
      firstName: memberWithUserId.firstName(),
      lastName: memberWithUserId.lastName(),
      email: memberWithUserId.email(),
      householdId: memberWithUserId.householdId()
    });
  }

  withSnapshots(snapshots: HouseholdMemberSnapshot[]): InMemoryHouseholdMemberRepository {
    this._members = new Map(snapshots.map(snapshot => [snapshot.id(), snapshot]));
    return this;
  }
}
