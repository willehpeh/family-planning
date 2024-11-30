import { EntitySnapshot } from '../../../../common';
import { HouseholdId, HouseholdMemberId, HouseholdName } from '../../value-objects';

export class HouseholdSnapshot implements EntitySnapshot {


  constructor(private readonly _id: HouseholdId,
              private readonly _name: HouseholdName,
              private readonly _memberIds: HouseholdMemberId[]) {
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
