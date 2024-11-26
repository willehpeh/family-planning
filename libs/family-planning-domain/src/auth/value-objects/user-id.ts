import { ValueObject } from '../../common';

export class UserId implements ValueObject<string> {

  constructor(private readonly _value: string) {}

  equals(other: UserId): boolean {
    return this._value === other._value;
  }
  value(): string {
    return this._value;
  }
}
