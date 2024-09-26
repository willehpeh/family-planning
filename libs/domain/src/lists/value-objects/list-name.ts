import { ValueObject } from '../../common/value-object';

export class ListName implements ValueObject<string> {

  private readonly _value: string;

  constructor(listName: string) {
    this._value = listName;
  }

  value(): string {
    return this._value;
  }

  equals(other: ListName): boolean {
    return this._value === other._value;
  }
}
