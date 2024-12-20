import { DomainEvent } from '../../../common';
import { PendingHouseholdMember } from '../value-objects';

export class NewMemberInvitedEvent implements DomainEvent {

  private readonly _eventName = 'NewMemberInvited';
  private readonly _occurredOn = new Date();

  public readonly householdId: string;
  public readonly memberId: string;
  public readonly lastName: string;
  public readonly firstName: string;
  public readonly email: string;

  constructor(pendingMember: PendingHouseholdMember) {
    const { householdId, id, firstName, lastName, email } = pendingMember.value();
    this.householdId = householdId;
    this.memberId = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }
}
