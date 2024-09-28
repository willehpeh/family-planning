import { ValueObject } from '../../../common';

type TaskStatusString = 'pending' | 'completed';

export class TaskStatus implements ValueObject<string> {
  private readonly _value: TaskStatusString;

  constructor(status: TaskStatusString) {
    this._value = status;
  }

  value(): TaskStatusString {
    return this._value;
  }

  equals(other: TaskStatus): boolean {
    return this._value === other._value;
  }
}
