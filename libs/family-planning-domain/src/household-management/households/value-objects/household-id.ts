import { ValueObject } from '../../../common';

export class HouseholdId implements ValueObject<string> {

  private static readonly PREFIX = 'HH';

  constructor(private readonly _id: string) {}

  equals(other: HouseholdId): boolean {
    return this.value() === other.value();
  }

  value(): string {
    return this._id;
  }

  static new(): HouseholdId {
    return new HouseholdId(`${HouseholdId.PREFIX}:${crypto.randomUUID()}`);
  }

  static fromString(id: string): HouseholdId {
    if (!id.match(/^HH:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
      throw new Error(`Invalid id ${id}`);
    }
    return new HouseholdId(id);
  }
}
