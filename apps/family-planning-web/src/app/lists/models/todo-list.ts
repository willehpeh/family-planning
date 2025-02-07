import { TodoListItem } from './todo-list-item';

export type TodoList = {
  id: string;
  name: string;
  items: TodoListItem[];
}

export const NullTodoList = (): TodoList => {
  return {
    id: '',
    name: '',
    items: []
  };
};

export const isNullTodoList = (list: TodoList): boolean => {
  return list.id === '' && list.name === '' && list.items.length === 0;
}
