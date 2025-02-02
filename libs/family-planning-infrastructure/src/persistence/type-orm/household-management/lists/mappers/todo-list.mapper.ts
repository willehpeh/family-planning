import { TodoList as TodoListEntity } from '../entities/todo-list.entity';
import {
  HouseholdId,
  TodoList,
  TodoListId,
  TodoListItemId,
  TodoListName,
  TodoListSnapshot
} from '@family-planning/domain';

export class TodoListMapper {
  static toPersistence(todoList: TodoList): TodoListEntity {
    const entity = new TodoListEntity();
    const snapshot = todoList.snapshot();
    entity.id = snapshot.id();
    entity.name = snapshot.name();
    entity.itemIds = snapshot.itemIds();
    entity.householdId = snapshot.householdId();
    return entity;
  }

  static toDomain(entity: TodoListEntity): TodoList {
    const id = TodoListId.fromString(entity.id);
    const name = new TodoListName(entity.name);
    const householdId = HouseholdId.fromString(entity.householdId);
    const itemIds = entity.itemIds.map(id => TodoListItemId.fromString(id));
    const snapshot = new TodoListSnapshot({ id, name, itemIds, householdId });
    return TodoList.fromSnapshot(snapshot);
  }

}
