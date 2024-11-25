import { EntitySnapshot } from '../../../../common';
import { HouseholdName } from '../../value-objects';

export class HouseholdSnapshot implements EntitySnapshot {

  constructor(private readonly _name: HouseholdName) {}

  id(): string {
    return '';
  }

  name() {
    return this._name.value();
  }
}
