import { DomainEvent } from '../../../common';
import { PendingHouseholdMember } from '../value-objects';

export class NewMemberInvitedEvent implements DomainEvent {

  private readonly _eventName = 'NewMemberInvited';
  private readonly _occurredOn = new Date();

  public readonly householdId: string;
  public readonly memberId: string;
  public readonly memberLastName: string;
  public readonly memberFirstName: string;
  public readonly memberEmail: string;

  constructor(pendingMember: PendingHouseholdMember) {
    this.householdId = pendingMember.value().householdId;
    this.memberId = pendingMember.value().id;
    this.memberLastName = pendingMember.value().lastName;
    this.memberFirstName = pendingMember.value().firstName;
    this.memberEmail = pendingMember.value().email;
  }

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }
}
