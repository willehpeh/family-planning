import { ValueObject } from '../../../common';

export class Email implements ValueObject<string> {

  constructor(private readonly _email: string) {}

  equals(other: Email): boolean {
    return this._email === other._email;
  }

  value(): string {
    return this._email;
  }
}
