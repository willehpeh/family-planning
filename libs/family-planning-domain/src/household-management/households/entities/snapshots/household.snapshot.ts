import { EntitySnapshot } from '../../../../common';
import { HouseholdId, HouseholdName } from '../../value-objects';
import { HouseholdMember } from '../household-member';
import { HouseholdMemberSnapshot } from './household-member.snapshot';

export class HouseholdSnapshot implements EntitySnapshot {

  private readonly _members: HouseholdMemberSnapshot[];

  constructor(private readonly _id: HouseholdId,
              private readonly _name: HouseholdName,
              members: HouseholdMember[]) {
    this._members = members.map(member => member.snapshot());
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  members(): HouseholdMemberSnapshot[] {
    return this._members;
  }
}
