import { Entity } from '../../../common';
import { HouseholdSnapshot } from './snapshots';
import { Email, FirstName, HouseholdId, HouseholdMemberId, HouseholdName, LastName } from '../value-objects';
import { HouseholdMember } from './household-member';
import { UserId } from '../../../auth';

export class Household implements Entity<HouseholdSnapshot> {

  private _members: HouseholdMember[] = [];

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
    });
  }

  createNewMember(
    id: HouseholdMemberId,
    userId: UserId,
    lastName: LastName,
    firstName: FirstName,
    email: Email,
  ): void {
    const member = new HouseholdMember({
      householdId: this._id,
      id,
      userId,
      lastName,
      firstName,
      email,
    });
    this._members.push(member);
  }
}
