import { TodoList as TodoListEntity } from '../entities/todo-list.entity';
import {
  HouseholdId,
  TodoList,
  TodoListId,
  TodoListItemId,
  TodoListItemName,
  TodoListItemSnapshot,
  TodoListItemStatus,
  TodoListName,
  TodoListSnapshot
} from '@family-planning/domain';
import { TodoListItem, TodoListItem as TodoListItemEntity } from '../entities/todo-list-item.entity';

export class TodoListMapper {
  static toPersistence(todoList: TodoList): TodoListEntity {
    const entity = new TodoListEntity();
    const snapshot = todoList.snapshot();
    entity.id = snapshot.id();
    entity.name = snapshot.name();
    entity.items = snapshot.items().map(item => this.doaminItemToEntity(item));
    entity.householdId = snapshot.householdId();
    return entity;
  }

  static toDomain(entity: TodoListEntity): TodoList {
    const id = TodoListId.fromString(entity.id);
    const name = new TodoListName(entity.name);
    const householdId = HouseholdId.fromString(entity.householdId);
    const items = entity.items.map(item => this.itemEntityToDomainItem(item, householdId));
    const snapshot = new TodoListSnapshot({ id, name, items, householdId });
    return TodoList.fromSnapshot(snapshot);
  }

  private static doaminItemToEntity(item: TodoListItemSnapshot) {
    const itemEntity = new TodoListItemEntity();
    itemEntity.id = item.id();
    itemEntity.name = item.name();
    itemEntity.householdId = item.householdId();
    itemEntity.status = item.status();
    if (item.done()) {
      itemEntity.dateCompleted = item.dateCompleted();
    }
    return itemEntity;
  }

  private static itemEntityToDomainItem(item: TodoListItem, householdId: HouseholdId) {
    const itemId = TodoListItemId.fromString(item.id);
    const itemName = new TodoListItemName(item.name);
    const itemStatus = new TodoListItemStatus(item.status);
    if (itemStatus.value() === 'done') {
      const dateComplated = new Date(item.dateCompleted);
      return new TodoListItemSnapshot({
        id: itemId,
        name: itemName,
        householdId,
        status: itemStatus,
        dateCompleted: dateComplated
      });
    }
    return new TodoListItemSnapshot({
      id: itemId,
      name: itemName,
      householdId,
      status: itemStatus
    });
  }
}
