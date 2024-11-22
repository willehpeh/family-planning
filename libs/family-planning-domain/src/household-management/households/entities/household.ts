import { Entity } from '../../../common';
import { HouseholdSnapshot } from './snapshots';

export class Household implements Entity<HouseholdSnapshot> {
  snapshot(): HouseholdSnapshot {
    return new HouseholdSnapshot();
  }
}
