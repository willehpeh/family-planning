import { Entity } from '../../../common';
import { HouseholdSnapshot } from './snapshots';
import { CreatingMemberDetails } from '../types';
import { HouseholdName } from '../value-objects';

export class Household implements Entity<HouseholdSnapshot> {

  private constructor(private _name: HouseholdName) {}

  snapshot(): HouseholdSnapshot {
    return new HouseholdSnapshot(this._name);
  }

  static createNew(householdName: string, creatingMember: CreatingMemberDetails): Household {
    const name = new HouseholdName(householdName);
    return new Household(name);
  }
}
