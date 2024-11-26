import { ValueObject } from '../../../common';

export class LastName implements ValueObject<string> {

  constructor(private readonly _lastName: string) {}

  equals(other: LastName): boolean {
    return this._lastName === other._lastName;
  }

  value(): string {
    return this._lastName;
  }
}
