import { EntitySnapshot } from '../../../../common';
import { Email, FirstName, HouseholdId, HouseholdMemberId, LastName } from '../../value-objects';
import { UserId } from '../../../../auth';

export class HouseholdMemberSnapshot implements EntitySnapshot {
  constructor(private readonly _id: HouseholdMemberId,
              private readonly _userId: UserId,
              private readonly _householdId: HouseholdId,
              private readonly _lastName: LastName,
              private readonly _firstName: FirstName, private readonly _email: Email) {

  }

  id(): string {
    return this._id.value();
  }

  userId(): string {
    return this._userId.value();
  }

  lastName(): string {
    return this._lastName.value();
  }

  firstName(): string {
    return this._firstName.value();
  }

  email(): string {
    return this._email.value();
  }

  householdId(): string {
    return this._householdId.value();
  }
}
