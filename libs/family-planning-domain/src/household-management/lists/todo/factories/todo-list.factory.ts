import { TodoList } from '../entities';
import { TodoListId, TodoListName } from '../value-objects';
import { HouseholdId } from '../../../households';

export class TodoListFactory {
  createEmptyList(name: string, _householdId: string): TodoList {
    const newId = TodoListId.new();
    const todoListName = new TodoListName(name);
    const householdId = HouseholdId.fromString(_householdId);
    return new TodoList(newId, todoListName, householdId);
  }
}
