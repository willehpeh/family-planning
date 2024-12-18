import { DomainEvent } from '../../common';

export class UserCreatedEvent implements DomainEvent {

  private readonly _eventName = 'UserCreated';
  private readonly _occurredOn = new Date();

  constructor(public readonly userId: string,
              public readonly firstName: string,
              public readonly lastName: string,
              public readonly email: string) {
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }


}
