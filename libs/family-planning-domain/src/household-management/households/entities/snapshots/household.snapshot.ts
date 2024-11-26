import { EntitySnapshot } from '../../../../common';
import { HouseholdName } from '../../value-objects';
import { HouseholdMember } from '../household-member';
import { HouseholdMemberSnapshot } from './household-member.snapshot';
import { TodoList, TodoListSnapshot } from '../../../lists';

export class HouseholdSnapshot implements EntitySnapshot {

  private readonly _members: HouseholdMemberSnapshot[];
  private readonly _todoLists: TodoListSnapshot[];

  constructor(private readonly _name: HouseholdName,
              members: HouseholdMember[],
              todoLists: TodoList[]) {
    this._members = members.map(member => member.snapshot());
    this._todoLists = todoLists.map(list => list.snapshot());
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

  todoLists(): TodoListSnapshot[] {
    return this._todoLists;
  }
}
