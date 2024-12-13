import { EntitySnapshot } from '../../../../common';
import { HouseholdId, HouseholdName } from '../../value-objects';
import { HouseholdMemberSnapshot } from './household-member.snapshot';

export class HouseholdSnapshot implements EntitySnapshot {

  private readonly _id: HouseholdId;
  private readonly _name: HouseholdName;
  private readonly _members: HouseholdMemberSnapshot[];

  constructor(householdProps: { id: HouseholdId, name: HouseholdName, members: HouseholdMemberSnapshot[] }) {
    this._id = householdProps.id;
    this._name = householdProps.name;
    this._members = householdProps.members;
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
}
