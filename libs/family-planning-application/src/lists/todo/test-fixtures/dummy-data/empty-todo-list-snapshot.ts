import { TodoListId, TodoListName, TodoListSnapshot } from '@family-planning/domain';

export const EMPTY_TODO_LIST_SNAPSHOT = new TodoListSnapshot(
  TodoListId.new(),
  new TodoListName('My List'),
  [],
);
