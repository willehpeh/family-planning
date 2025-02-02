import {
  HouseholdId,
  TodoListId,
  TodoListItem,
  TodoListItemId,
  TodoListItemName,
  TodoListItemSnapshot,
  TodoListItemStatus
} from '@family-planning/domain';
import { TodoListItem as TodoListItemEntity } from '../entities/todo-list-item.entity';

export class TodoListItemMapper {
  static toDomain(entity: TodoListItemEntity): TodoListItem {
    const snapshot = new TodoListItemSnapshot({
      id: TodoListItemId.fromString(entity.id),
      name: new TodoListItemName(entity.name),
      status: new TodoListItemStatus(entity.status),
      listId: TodoListId.fromString(entity.listId),
      householdId: HouseholdId.fromString(entity.householdId),
      dateCompleted: entity.dateCompleted ? new Date(entity.dateCompleted) : null
    });
    return TodoListItem.fromSnapshot(snapshot);
  }

  static toPersistence(item: TodoListItem): TodoListItemEntity {
    const entity = new TodoListItemEntity();
    const snapshot = item.snapshot();
    entity.id = snapshot.id();
    entity.name = snapshot.name();
    entity.status = snapshot.status();
    entity.listId = snapshot.listId();
    entity.householdId = snapshot.householdId();
    const dateCompleted = snapshot.dateCompleted();
    entity.dateCompleted = dateCompleted ? dateCompleted.toISOString() : null;
    return entity;
  }
}
