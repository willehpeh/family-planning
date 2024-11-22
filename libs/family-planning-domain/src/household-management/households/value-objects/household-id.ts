import { ValueObject } from '../../../common';

export class HouseholdId implements ValueObject<string> {

  private static readonly PREFIX = 'HH';

  private constructor(private readonly _id: string) {}

  value(): string {
    return this._id;
  }

  equals(other: HouseholdId): boolean {
    return this._id === other._id;
  }

  static new(): HouseholdId {
    const id = `${ HouseholdId.PREFIX }:${ crypto.randomUUID() }`;
    return new HouseholdId(id);
  }
}
