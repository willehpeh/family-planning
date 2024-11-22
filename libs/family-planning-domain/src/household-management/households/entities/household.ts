import { Entity } from '../../../common';
import { HouseholdSnapshot } from './snapshots';
import { HouseholdId } from '../value-objects';

export class Household implements Entity<HouseholdSnapshot> {

  private constructor(private readonly _id: HouseholdId) {}

  snapshot(): HouseholdSnapshot {
    return new HouseholdSnapshot(this._id);
  }
}
