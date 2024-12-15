import { EntitySnapshot } from '../../../../common';
import { HouseholdId, HouseholdName, PendingHouseholdMember } from '../../value-objects';
import { HouseholdMemberSnapshot } from './household-member.snapshot';

export class HouseholdSnapshot implements EntitySnapshot {

  private readonly _id: HouseholdId;
  private readonly _name: HouseholdName;
  private readonly _members: HouseholdMemberSnapshot[];
  private readonly _pendingMembers: PendingHouseholdMember[];

  constructor(householdProps: {
    id: HouseholdId,
    name: HouseholdName,
    members: HouseholdMemberSnapshot[],
    pendingMembers: PendingHouseholdMember[],
  }) {
    this._id = householdProps.id;
    this._name = householdProps.name;
    this._members = householdProps.members;
    this._pendingMembers = householdProps.pendingMembers;
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  memberIds(): string[] {
    return this._members.map(snapshot => snapshot.id());
  }

  members(): HouseholdMemberSnapshot[] {
    return this._members;
  }

  pendingMembers(): {
    id: string,
    lastName: string,
    firstName: string,
    email: string,
    householdId: string,
  }[] {
    return this._pendingMembers.map(member => member.value());
  }
}
