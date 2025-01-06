import { TodoListId, TodoListName } from '../../value-objects';
import { EntitySnapshot } from '../../../../../common';
import { TodoListItemSnapshot } from './todo-list-item.snapshot';
import { HouseholdId } from '../../../../households';

export class TodoListSnapshot implements EntitySnapshot {

  private readonly _id: TodoListId;
  private readonly _name: TodoListName;
  private readonly _items: TodoListItemSnapshot[];
  private readonly _householdId: HouseholdId;

  constructor(snapshot: {
    id: TodoListId,
    name: TodoListName,
    items: TodoListItemSnapshot[],
    householdId: HouseholdId
  }) {
    this._id = snapshot.id;
    this._name = snapshot.name;
    this._items = snapshot.items;
    this._householdId = snapshot.householdId;
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  items() {
    return this._items;
  }

  householdId(): string {
    return this._householdId.value();
  }
}
