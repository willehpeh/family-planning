import { TodoList as TodoListEntity } from '../entities/todo-list.entity';
import {
  HouseholdId,
  TodoList,
  TodoListId,
  TodoListItemId,
  TodoListItemName,
  TodoListItemSnapshot,
  TodoListName,
  TodoListSnapshot
} from '@family-planning/domain';
import { TodoListItem as TodoListItemEntity } from '../entities/todo-list-item.entity';

export class TodoListMapper {
  static toPersistence(todoList: TodoList): TodoListEntity {
    const entity = new TodoListEntity();
    const snapshot = todoList.snapshot();
    entity.id = snapshot.id();
    entity.name = snapshot.name();
    entity.items = snapshot.items().map(item => {
      const itemEntity = new TodoListItemEntity();
      itemEntity.id = item.id();
      itemEntity.name = item.name();
      itemEntity.householdId = item.householdId();
      return itemEntity;
    });
    entity.householdId = snapshot.householdId();
    return entity;
  }

  static toDomain(entity: TodoListEntity): TodoList {
    const id = TodoListId.fromString(entity.id);
    const name = new TodoListName(entity.name);
    const householdId = HouseholdId.fromString(entity.householdId);
    const items = entity.items.map(item => {
      const itemId = TodoListItemId.fromString(item.id);
      const itemName = new TodoListItemName(item.name);
      return new TodoListItemSnapshot(itemId, itemName, householdId);
    });
    const snapshot = new TodoListSnapshot(id, name, items, householdId);
    return TodoList.fromSnapshot(snapshot);
  }
}
