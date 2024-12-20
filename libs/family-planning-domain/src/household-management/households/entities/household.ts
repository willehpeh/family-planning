import { DomainEvent, Entity, EventBus } from '../../../common';
import { HouseholdSnapshot } from './snapshots';
import {
  Email,
  FirstName,
  HouseholdId,
  HouseholdMemberId,
  HouseholdName,
  LastName,
  PendingHouseholdMember
} from '../value-objects';
import { HouseholdMember } from './household-member';
import { UserId } from '../../../auth';
import { NewMemberInvitedEvent } from '../events';

type HouseholdDetails = {
  id: HouseholdId,
  name: HouseholdName,
}

type MemberDetails = {
  id: HouseholdMemberId,
  userId: UserId,
  lastName: LastName,
  firstName: FirstName,
  email: Email,
}

export class Household implements Entity<HouseholdSnapshot> {

  private _members: HouseholdMember[] = [];
  private _pendingMembers: PendingHouseholdMember[] = [];
  private _events: DomainEvent[] = [];

  private constructor(private _id: HouseholdId,
                      private _name: HouseholdName) {
  }

  static householdWithMembers(householdDetails: HouseholdDetails, memberDetails: MemberDetails[], pendingMembers?: PendingHouseholdMember[]): Household {
    const household = new Household(householdDetails.id, householdDetails.name);
    memberDetails.forEach(memberDetail => household.addMember(memberDetail));
    household._pendingMembers = pendingMembers || [];
    return household;
  }

  static createNew(
    householdDetails: {
      id: HouseholdId,
      name: HouseholdName,
    },
    memberDetails: {
      id: HouseholdMemberId,
      userId: UserId,
      lastName: LastName,
      firstName: FirstName,
      email: Email,
    }
  ): Household {
    return Household.householdWithMembers(householdDetails, [memberDetails]);
  }

  snapshot(): HouseholdSnapshot {
    return new HouseholdSnapshot({
      id: this._id,
      name: this._name,
      members: this._members.map(member => member.snapshot()),
      pendingMembers: this._pendingMembers,
    });
  }

  publishEventsTo(eventBus: EventBus): void {
    this._events.forEach(event => eventBus.publish(event));
    this._events = [];
  }

  addMember(memberDetails: MemberDetails): void {
    const member = this.newMember(memberDetails);
    this._members.push(member);
  }

  inviteNewMember(memberDetails: { firstName: FirstName; lastName: LastName; email: Email }) {
    if (this._pendingMembers.some(member => member.value().email === memberDetails.email.value())) {
      throw new Error('Member with this email already exists');
    }
    const member = new PendingHouseholdMember({
      householdId: this._id,
      id: HouseholdMemberId.new(),
      lastName: memberDetails.lastName,
      firstName: memberDetails.firstName,
      email: memberDetails.email,
    });
    this._pendingMembers.push(member);
    this.raiseEvent(new NewMemberInvitedEvent(member));
  }

  private newMember(memberDetails: MemberDetails) {
    return new HouseholdMember({
      householdId: this._id,
      id: memberDetails.id,
      userId: memberDetails.userId,
      lastName: memberDetails.lastName,
      firstName: memberDetails.firstName,
      email: memberDetails.email,
    });
  }

  private raiseEvent(event: DomainEvent) {
    this._events.push(event);
  }

  confirmNewMember(memberId: HouseholdMemberId, userId: UserId) {
    const pendingMember = this._pendingMembers.find(member => member.value().id === memberId.value());
    if (!pendingMember) {
      throw new Error('Member not found');
    }
    this.addMember({
      id: memberId,
      userId,
      lastName: new LastName(pendingMember.value().lastName),
      firstName: new FirstName(pendingMember.value().firstName),
      email: new Email(pendingMember.value().email),
    })
    this.removePendingMember(memberId);
  }

  private removePendingMember(memberId: HouseholdMemberId) {
    this._pendingMembers = this._pendingMembers.filter(member => member.value().id !== memberId.value());
  }
}
