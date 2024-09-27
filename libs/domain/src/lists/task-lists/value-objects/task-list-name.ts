import { ValueObject } from '../../../common';

export class TaskListName implements ValueObject<string> {

  private readonly _value: string;

  constructor(listName: string) {
    this._value = listName;
  }

  value(): string {
    return this._value;
  }

  equals(other: TaskListName): boolean {
    return this._value === other._value;
  }
}
