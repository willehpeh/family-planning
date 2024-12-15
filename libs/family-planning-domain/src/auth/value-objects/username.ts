import { ValueObject } from '../../common';

export class Username implements ValueObject<string> {
  private readonly _value: string;
  constructor(value: string) {
    this._value = value;
  }
  value(): string {
    return this._value;
  }
  equals(other: Username): boolean {
    return this._value === other.value();
  }
}
