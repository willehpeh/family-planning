import { DomainEvent } from '../../common';

export class UserCreatedForHouseholdEvent implements DomainEvent {

  private readonly _eventName = 'UserCreatedForHousehold';
  private readonly _occurredOn = new Date();

  public readonly userId: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly householdId: string;
  public readonly memberId: string;

  constructor({ userId, firstName, lastName, email, householdId, memberId }: {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    householdId: string,
    memberId: string
  }) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.householdId = householdId;
    this.memberId = memberId;
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }


}
