import { ValueObject } from '../../../common';

export class TaskListId implements ValueObject<string> {

  private constructor(private readonly _id: string) {}

  equals(other: TaskListId): boolean {
    return this._id === other._id;
  }

  value(): string {
    return this._id;
  }

  static new(): TaskListId {
    const id = `TLIST-${crypto.randomUUID()}`;
    return new TaskListId(id);
  }

  static fromString(id: string): TaskListId {
    return new TaskListId(id);
  }

}
