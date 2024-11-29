import { Entity } from '../../../common';
import { HouseholdSnapshot } from './snapshots';
import { HouseholdId, HouseholdMemberId, HouseholdName } from '../value-objects';

export class Household implements Entity<HouseholdSnapshot> {

  constructor(private _id: HouseholdId,
              private _name: HouseholdName,
              private _members: HouseholdMemberId[]) {
  }

  snapshot(): HouseholdSnapshot {
    return new HouseholdSnapshot(this._id, this._name, this._members);
  }
}
