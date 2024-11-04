import { ValueObject } from '../../../common';

export class TodoListItemId implements ValueObject<string> {
  private static readonly PREFIX = 'TODOLISTITEM';

  private constructor(private readonly _id: string) {}

  value(): string {
    return this._id;
  }

  equals(other: TodoListItemId): boolean {
    return this._id === other._id;
  }

  static new(): TodoListItemId {
    const id = `${TodoListItemId.PREFIX}:${ crypto.randomUUID() }`;
    return new TodoListItemId(id);
  }

  static fromString(id: string): TodoListItemId {
    if (!id.match(/^TODOLISTITEM:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
      throw new Error(`Invalid id ${id}`);
    }
    return new TodoListItemId(id);
  }
}
