import { Entity } from '../../../common';
import { HouseholdSnapshot } from './snapshots';
import { CreatingMemberDetails } from '../types';
import { Email, FirstName, HouseholdMemberId, HouseholdName, LastName } from '../value-objects';
import { HouseholdMember } from './household-member';
import { UserId } from '../../../auth';
import { TodoList } from '../../lists';

export class Household implements Entity<HouseholdSnapshot> {

  private _todoLists: TodoList[] = [];

  private constructor(private _name: HouseholdName,
                      private _members: HouseholdMember[]) {
  }

  snapshot(): HouseholdSnapshot {
    return new HouseholdSnapshot(this._name, this._members, this._todoLists);
  }

  static createNew(householdName: HouseholdName, details: CreatingMemberDetails): Household {
    const memberId = HouseholdMemberId.new();
    const userId = new UserId(details.userId);
    const lastName = new LastName(details.lastName);
    const firstName = new FirstName(details.firstName);
    const email = new Email(details.email);
    const member = new HouseholdMember(memberId, userId, lastName, firstName, email);
    return new Household(householdName, [member]);
  }
}
