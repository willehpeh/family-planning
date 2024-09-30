import { ValueObject } from '../../../common';

export class TaskId implements ValueObject<string> {
  private constructor(private readonly _id: string) {}

  equals(other: TaskId): boolean {
    return this._id === other._id;
  }

  value(): string {
    return this._id;
  }

  static new(): TaskId {
    const id = `TASK-${ crypto.randomUUID() }`;
    return new TaskId(id);
  }

  static fromString(id: string): TaskId {
    return new TaskId(id);
  }
}
