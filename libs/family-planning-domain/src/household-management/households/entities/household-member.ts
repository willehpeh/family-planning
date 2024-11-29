import { HouseholdMemberSnapshot } from './snapshots';
import { Entity } from '../../../common';
import { Email, FirstName, HouseholdId, HouseholdMemberId, LastName } from '../value-objects';
import { UserId } from '../../../auth';

export class HouseholdMember implements Entity<HouseholdMemberSnapshot> {

  constructor(private readonly _id: HouseholdMemberId,
              private readonly _userId: UserId,
              private readonly _householdId: HouseholdId,
              private readonly _lastName: LastName,
              private readonly _firstName: FirstName,
              private readonly _email: Email) {
  }

  snapshot(): HouseholdMemberSnapshot {
    return new HouseholdMemberSnapshot(this._id, this._userId, this._householdId, this._lastName, this._firstName, this._email);
  }
}
