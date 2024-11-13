import { ValueObject } from '../../../../common';

export class TodoListName implements ValueObject<string> {
  constructor(private readonly _name: string) {}

  value(): string {
    return this._name;
  }

  equals(other: TodoListName): boolean {
    return this._name === other.value();
  }
}
