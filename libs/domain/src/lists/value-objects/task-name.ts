import { ValueObject } from '../../common';

export class TaskName implements ValueObject<string> {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  value(): string {
    return this._name;
  }

  equals(taskName: TaskName): boolean {
    return this._name === taskName.value();
  }
}
