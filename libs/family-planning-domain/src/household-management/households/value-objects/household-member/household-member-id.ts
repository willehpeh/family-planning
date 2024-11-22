import { ValueObject } from '../../../../common';

export class HouseholdMemberId implements ValueObject<string> {
  constructor(private readonly _id: string) {}
  equals(other: HouseholdMemberId): boolean {
    return this._id === other._id;
  }
  value(): string {
    return this._id;
  }
}
