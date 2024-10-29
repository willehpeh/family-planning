import { ValueObject } from '../../../common';

export class TodoListId implements ValueObject<string> {

  private static readonly PREFIX = 'TODOLIST';

  private constructor(private readonly _id: string) {}

  value(): string {
    return this._id;
  }

  equals(other: TodoListId): boolean {
    return this._id === other._id;
  }

  static new(): TodoListId {
    const id = `${TodoListId.PREFIX}:${ crypto.randomUUID() }`;
    return new TodoListId(id);
  }
}
