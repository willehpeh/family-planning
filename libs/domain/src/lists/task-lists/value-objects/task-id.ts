import { ValueObject } from '../../../common';

export class TaskId implements ValueObject<string> {
  constructor(private readonly _id: string) {}

  equals(other: TaskId): boolean {
    return this._id === other._id;
  }

  value(): string {
    return this._id;
  }
}
