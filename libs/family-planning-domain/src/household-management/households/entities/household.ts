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

export type HouseholdDetails = {
  id: HouseholdId,
  name: HouseholdName,
}

export type MemberDetails = {
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

  static create(householdDetails: HouseholdDetails, memberDetails: MemberDetails[], pendingMembers?: PendingHouseholdMember[]): Household {
    const household = new Household(householdDetails.id, householdDetails.name);
    memberDetails.forEach(memberDetail => household.addMember(memberDetail));
    household._pendingMembers = pendingMembers || [];
    return household;
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
    if (this.cannotAddMember(memberDetails.email)) {
      throw new Error('Member already exists');
    }
    const member = this.createNewPendingMember(memberDetails);
    this._pendingMembers.push(member);
    this.raiseEvent(new NewMemberInvitedEvent(member));
  }

  private createNewPendingMember(memberDetails: { firstName: FirstName; lastName: LastName; email: Email }) {
    return new PendingHouseholdMember({
      ...memberDetails,
      householdId: this._id,
      id: HouseholdMemberId.new(),
    });
  }

  private cannotAddMember(email: Email) {
    return this.memberAlreadyExistsWithEmail(email) || this.pendingMemberAlreadyExistsWithEmail(email);
  }

  private pendingMemberAlreadyExistsWithEmail(email: Email) {
    return this._pendingMembers.some(member => member.hasEmail(email));
  }

  private memberAlreadyExistsWithEmail(email: Email) {
    return this._members.some(member => member.hasEmail(email));
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

  confirmPendingMember(memberId: HouseholdMemberId, userId: UserId) {
    const pendingMember = this.pendingMemberById(memberId);
    if (!pendingMember) {
      throw new Error('Member not found');
    }
    this.convertPendingMember(pendingMember, userId);
  }

  private convertPendingMember(pendingMember: PendingHouseholdMember, userId: UserId) {
    this._members.push(pendingMember.toHouseholdMember(userId));
    this.removePendingMember(pendingMember);
  }

  private pendingMemberById(memberId: HouseholdMemberId) {
    return this._pendingMembers.find(member => member.value().id === memberId.value());
  }

  private removePendingMember(pendingMember: PendingHouseholdMember) {
    this._pendingMembers = this._pendingMembers.filter(member => !member.equals(pendingMember));
  }
}
