import { EntitySnapshot } from '../../../../common';
import { HouseholdName } from '../../value-objects';
import { HouseholdMember } from '../household-member';
import { HouseholdMemberSnapshot } from './household-member.snapshot';

export class HouseholdSnapshot implements EntitySnapshot {

  private readonly _members: HouseholdMemberSnapshot[];

  constructor(private readonly _name: HouseholdName,
              members: HouseholdMember[]) {
    this._members = members.map(member => member.snapshot());
  }

  id(): string {
    return '';
  }

  name(): string {
    return this._name.value();
  }

  members(): HouseholdMemberSnapshot[] {
    return this._members;
  }
}
