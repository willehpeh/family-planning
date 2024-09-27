import { ValueObject } from '../../../common';

export class TaskListId implements ValueObject<string> {

  constructor(private readonly _id: string) {}

  equals(other: TaskListId): boolean {
    return this._id === other._id;
  }

  value(): string {
    return this._id;
  }

}
