import { ValueObject } from '../../../common';
import { Email } from './email';
import { FirstName } from './first-name';
import { HouseholdId } from './household-id';
import { LastName } from './last-name';
import { HouseholdMemberId } from './household-member-id';

export class PendingHouseholdMember implements ValueObject<{
  email: string,
  firstName: string,
  lastName: string,
  householdId: string,
  id: string,
}> {
  private readonly _email: Email;
  private readonly _firstName: FirstName;
  private readonly _lastName: LastName;
  private readonly _householdId: HouseholdId;
  private readonly _id: HouseholdMemberId;

  constructor({ email, firstName, lastName, householdId, id }: {
    email: Email,
    firstName: FirstName,
    lastName: LastName,
    householdId: HouseholdId,
    id: HouseholdMemberId,
  }) {
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._householdId = householdId;
    this._id = id;
  }

  value(): {
    email: string,
    firstName: string,
    lastName: string,
    householdId: string,
    id: string,
  } {
    return {
      email: this._email.value(),
      firstName: this._firstName.value(),
      lastName: this._lastName.value(),
      householdId: this._householdId.value(),
      id: this._id.value(),
    };
  }

  equals(other: PendingHouseholdMember): boolean {
    return this._email.equals(other._email) &&
      this._firstName.equals(other._firstName) &&
      this._lastName.equals(other._lastName) &&
      this._householdId.equals(other._householdId) &&
      this._id.equals(other._id);
  }
}
