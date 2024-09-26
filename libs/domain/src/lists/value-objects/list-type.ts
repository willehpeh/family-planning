import { ValueObject } from '../../common/value-object';

export type ListTypeString = 'task';

export class ListType implements ValueObject<ListTypeString> {
  private readonly _value: ListTypeString;

  constructor(value: ListTypeString) {
    this._value = value;
  }
  value(): ListTypeString {
    return this._value;
  }

  equals(other: ListType): boolean {
    return this.value() === other.value();
  }
}
