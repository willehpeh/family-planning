import { DomainEvent } from '../../../../common';
import { TodoListId, TodoListItemId } from '../value-objects';

export class TodoListItemCreatedEvent implements DomainEvent {

  private readonly _eventName = 'TodoListItemCreated';
  private readonly _occurredOn = new Date();

  public readonly id: TodoListItemId;
  public readonly listId: TodoListId;

  constructor(itemProps: { id: TodoListItemId, listId: TodoListId }) {
    this.id = itemProps.id;
    this.listId = itemProps.listId;
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }

}
