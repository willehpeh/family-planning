import { DomainEvent } from '../../common';

export class UserCreatedEvent implements DomainEvent {

  private readonly _eventName = 'UserCreated';
  private readonly _occurredOn = new Date();

  public readonly userId: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;

  constructor({ userId, firstName, lastName, email }: {
    userId: string,
    firstName: string,
    lastName: string,
    email: string
  }) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }


}
