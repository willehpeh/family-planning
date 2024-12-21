import { HouseholdMemberSnapshot } from './snapshots';
import { Entity } from '../../../common';
import { Email, FirstName, HouseholdId, HouseholdMemberId, LastName } from '../value-objects';
import { UserId } from '../../../auth';

export class HouseholdMember implements Entity<HouseholdMemberSnapshot> {

  private readonly _id: HouseholdMemberId;
  private readonly _userId: UserId;
  private readonly _householdId: HouseholdId;
  private readonly _lastName: LastName;
  private readonly _firstName: FirstName;
  private readonly _email: Email;

  constructor(memberProps: {
    id: HouseholdMemberId;
    userId: UserId;
    householdId: HouseholdId;
    lastName: LastName;
    firstName: FirstName;
    email: Email;
  }) {
    this._id = memberProps.id;
    this._userId = memberProps.userId;
    this._householdId = memberProps.householdId;
    this._lastName = memberProps.lastName;
    this._firstName = memberProps.firstName;
    this._email = memberProps.email;
  }

  snapshot(): HouseholdMemberSnapshot {
    return new HouseholdMemberSnapshot({
      id: this._id,
      userId: this._userId,
      householdId: this._householdId,
      lastName: this._lastName,
      firstName: this._firstName,
      email: this._email,
    });
  }

  hasEmail(email: Email) {
    return this._email.equals(email);
  }
}
