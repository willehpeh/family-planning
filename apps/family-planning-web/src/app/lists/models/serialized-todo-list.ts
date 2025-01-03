import { SerializedTodoListItem } from './serialized-todo-list-item';

export type SerializedTodoList = {
  id: string;
  name: string;
  items: SerializedTodoListItem[]
}

export const NullSerializedTodoList: SerializedTodoList = {
  id: '',
  name: '',
  items: []
}
