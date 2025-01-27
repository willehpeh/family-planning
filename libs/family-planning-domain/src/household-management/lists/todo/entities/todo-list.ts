import { TodoListId, TodoListItemId, TodoListName } from '../value-objects';
import { TodoListSnapshot } from './snapshots';
import { DomainEvent, Entity, EventBus } from '../../../../common';
import { HouseholdId } from '../../../households';
import { TodoListItemCreatedEvent } from '../events/todo-list-item-created.event';

export class TodoList implements Entity<TodoListSnapshot> {

  private _itemIds: TodoListItemId[] = [];
  private _events: DomainEvent[] = [];

  constructor(private readonly _id: TodoListId,
              private _name: TodoListName,
              private readonly householdId: HouseholdId) {
  }

  static fromSnapshot(snapshot: TodoListSnapshot): TodoList {
    const list = new TodoList(TodoListId.fromString(snapshot.id()), new TodoListName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()));
    list._itemIds = snapshot.itemIds().map(id => TodoListItemId.fromString(id));
    return list;
  }

  snapshot(): TodoListSnapshot {
    return new TodoListSnapshot({
      id: this._id,
      name: this._name,
      itemIds: this._itemIds,
      householdId: this.householdId
    });
  }

  addNewItem(itemName: string): void {
    this.raiseEvent(new TodoListItemCreatedEvent({ listId: this._id.value(), name: itemName }));
  }

  private raiseEvent(event: DomainEvent): void {
    this._events.push(event);
  }

  publishEventsTo(eventBus: EventBus): void {
    this._events.forEach(event => eventBus.publish(event));
    this._events = [];
  }
}
