import { ValueObject } from '../../../common';

export class Email implements ValueObject<string> {

  private readonly _email: string

  constructor(email: string) {
    this._email = email.toLowerCase();
  }

  equals(other: Email): boolean {
    return this._email === other._email;
  }

  value(): string {
    return this._email;
  }
}
