import { ValueObject } from '../../../common';

export class HouseholdMemberId implements ValueObject<string> {

  private static readonly PREFIX = 'MEMBER';

  constructor(private readonly _id: string) {}

  equals(other: HouseholdMemberId): boolean {
    return this._id === other._id;
  }

  value(): string {
    return this._id;
  }

  static new(): HouseholdMemberId {
    const id = `${HouseholdMemberId.PREFIX}:${ crypto.randomUUID() }`;
    return new HouseholdMemberId(id);
  }

  static fromString(id: string): HouseholdMemberId {
    if (!id.match(/^MEMBER:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
      throw new Error(`Invalid id ${id}`);
    }
    return new HouseholdMemberId(id);
  }
}
