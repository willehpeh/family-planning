import { TodoListItem } from './todo-list-item';

export type TodoList = {
  id: string;
  name: string;
  items: TodoListItem[]
}

