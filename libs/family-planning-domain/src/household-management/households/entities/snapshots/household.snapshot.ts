import { EntitySnapshot } from '../../../../common';
import { HouseholdId, HouseholdMemberId, HouseholdName } from '../../value-objects';

export class HouseholdSnapshot implements EntitySnapshot {

  private readonly _id: HouseholdId;
  private readonly _name: HouseholdName;
  private readonly _memberIds: HouseholdMemberId[];

  constructor(householdProps: { id: HouseholdId, name: HouseholdName, memberIds: HouseholdMemberId[] }) {
    this._id = householdProps.id;
    this._name = householdProps.name;
    this._memberIds = householdProps.memberIds;
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  memberIds(): string[] {
    return this._memberIds.map(id => id.value());
  }
}
