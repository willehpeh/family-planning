import { TodoListId, TodoListItemId, TodoListName } from '../../value-objects';
import { EntitySnapshot } from '../../../../../common';
import { HouseholdId } from '../../../../households';

export class TodoListSnapshot implements EntitySnapshot {

  private readonly _id: TodoListId;
  private readonly _name: TodoListName;
  private readonly _householdId: HouseholdId;
  private readonly _itemIds: TodoListItemId[];

  constructor(snapshot: {
    id: TodoListId,
    name: TodoListName,
    householdId: HouseholdId,
    itemIds: TodoListItemId[]
  }) {
    this._id = snapshot.id;
    this._name = snapshot.name;
    this._householdId = snapshot.householdId;
    this._itemIds = snapshot.itemIds ?? [];
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  householdId(): string {
    return this._householdId.value();
  }

  itemIds() {
    return this._itemIds.map(id => id.value());
  }
}
