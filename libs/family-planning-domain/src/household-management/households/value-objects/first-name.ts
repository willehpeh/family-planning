import { ValueObject } from '../../../common';

export class FirstName implements ValueObject<string> {

  constructor(private readonly _firstName: string) {}

  equals(other: FirstName): boolean {
    return this._firstName === other._firstName;
  }

  value(): string {
    return this._firstName;
  }
}
