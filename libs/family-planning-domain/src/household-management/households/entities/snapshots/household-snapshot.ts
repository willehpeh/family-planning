import { EntitySnapshot } from '../../../../common';
import { HouseholdId } from '../../value-objects';

export class HouseholdSnapshot implements EntitySnapshot {

  constructor(private readonly _id: HouseholdId) {}

  id(): string {
    return this._id.value();
  }
}
