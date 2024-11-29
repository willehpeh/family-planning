import { HouseholdMember, HouseholdMemberRepository, HouseholdMemberSnapshot } from '@family-planning/domain';

export class InMemoryHouseholdMemberRepository implements HouseholdMemberRepository {

  private readonly _members = new Map<string, HouseholdMemberSnapshot>();

  save(member: HouseholdMember): Promise<void> {
    this._members.set(member.snapshot().id(), member.snapshot());
    return Promise.resolve();
  }

  members(): HouseholdMemberSnapshot[] {
    return Array.from(this._members.values());
  }
}
