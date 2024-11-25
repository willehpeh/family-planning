import { ValueObject } from '../../../common';

export class HouseholdName implements ValueObject<string> {

  constructor(private readonly _name: string) {
  }

  equals(other: HouseholdName): boolean {
    return this._name === other._name;
  }
  value(): string {
    return this._name;
  }
}
