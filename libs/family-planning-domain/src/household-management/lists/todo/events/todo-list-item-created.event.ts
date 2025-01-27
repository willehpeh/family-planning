import { DomainEvent } from '../../../../common';

export class TodoListItemCreatedEvent implements DomainEvent {

  private readonly _eventName = 'TodoListItemCreatedEvent';
  private readonly _occurredOn = new Date();

  public readonly listId: string;
  public readonly name: string;

  constructor(itemProps: { listId: string, name: string }) {
    this.listId = itemProps.listId;
    this.name = itemProps.name;
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }

}
