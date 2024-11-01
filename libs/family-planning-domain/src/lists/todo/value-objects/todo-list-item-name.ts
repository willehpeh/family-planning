import { ValueObject } from '../../../common';

export class TodoListItemName implements ValueObject<string> {
  constructor(private readonly _name: string) {}

  value(): string {
    return this._name;
  }

  equals(other: TodoListItemName): boolean {
    return this._name === other.value();
  }
}
