import { TodoListItemReadModel } from './';

export type TodoListReadModel = {
  id: string;
  name: string;
  items: TodoListItemReadModel[];
}
