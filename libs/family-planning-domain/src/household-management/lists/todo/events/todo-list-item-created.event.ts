import { DomainEvent } from '../../../../common';

export class TodoListItemCreatedEvent implements DomainEvent {

  private readonly _eventName = 'TodoListItemCreatedEvent';
  private readonly _occurredOn = new Date();

  public readonly listId: string;
  public readonly itemId: string;

  constructor(itemProps: { listId: string, itemId: string }) {
    this.listId = itemProps.listId;
    this.itemId = itemProps.itemId;
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }

}
