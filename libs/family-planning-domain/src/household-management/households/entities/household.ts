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

export class Household implements Entity<HouseholdSnapshot> {

  private _members: HouseholdMember[] = [];
  private _pendingMembers: PendingHouseholdMember[] = [];
  private _events: DomainEvent[] = [];

  private constructor(private _id: HouseholdId,
                      private _name: HouseholdName) {
  }

  static householdWithMembers(
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
    }[]
  ): Household {
    const household = new Household(householdDetails.id, householdDetails.name);
    memberDetails.forEach(memberDetail => {
      household.createNewMember(
        memberDetail.id,
        memberDetail.userId,
        memberDetail.lastName,
        memberDetail.firstName,
        memberDetail.email,
      );
    });
    return household;
  }

  static newHousehold(
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
    const household = new Household(householdDetails.id, householdDetails.name);
    household.createNewMember(
      memberDetails.id,
      memberDetails.userId,
      memberDetails.lastName,
      memberDetails.firstName,
      memberDetails.email,
    );
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

  publishEvents(eventBus: EventBus): void {
    this._events.forEach(event => eventBus.publish(event));
    this._events = [];
  }

  createNewMember(
    id: HouseholdMemberId,
    userId: UserId,
    lastName: LastName,
    firstName: FirstName,
    email: Email,
  ): void {
    const member = this.newMember(id, userId, lastName, firstName, email);
    this._members.push(member);
  }

  inviteNewMember(memberDetails: { firstName: FirstName; lastName: LastName; email: Email }) {
    const member = new PendingHouseholdMember({
      householdId: this._id,
      id: HouseholdMemberId.new(),
      lastName: memberDetails.lastName,
      firstName: memberDetails.firstName,
      email: memberDetails.email,
    });
    this._pendingMembers.push(member);
    const memberValue = member.value();
    this.raiseEvent(new NewMemberInvitedEvent(
      memberValue.householdId,
      memberValue.id,
      memberValue.lastName,
      memberValue.firstName,
      memberValue.email,
    ));
  }

  private newMember(id: HouseholdMemberId, userId: UserId, lastName: LastName, firstName: FirstName, email: Email) {
    return new HouseholdMember({
      householdId: this._id,
      id,
      userId,
      lastName,
      firstName,
      email,
    });
  }

  private raiseEvent(event: DomainEvent) {
    this._events.push(event);
  }
}
