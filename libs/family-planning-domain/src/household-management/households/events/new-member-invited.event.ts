import { DomainEvent } from '../../../common';

export class NewMemberInvitedEvent implements DomainEvent {

  private readonly _eventName = 'NewMemberInvitedEvent';
  private readonly _occurredOn = new Date();

  constructor(
    public readonly householdId: string,
    public readonly memberId: string,
    public readonly memberLastName: string,
    public readonly memberFirstName: string,
    public readonly memberEmail: string,
  ) {}

  eventName(): string {
    return this._eventName;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }
}
