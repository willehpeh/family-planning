import { EntitySnapshot } from '../../../../common';
import { Email, FirstName, HouseholdMemberId, LastName } from '../../value-objects';
import { UserId } from '../../../../auth';

export class HouseholdMemberSnapshot implements EntitySnapshot {
  constructor(private readonly _id: HouseholdMemberId,
              private readonly userId: UserId,
              private readonly lastName: LastName,
              private readonly firstName: FirstName,
              private readonly email: Email) {

  }

  id(): string {
    return this._id.value();
  }

  toPojo() {
    return {
      id: this._id.value(),
      userId: this.userId.value(),
      lastName: this.lastName.value(),
      firstName: this.firstName.value(),
      email: this.email.value(),
    };
  }
}
