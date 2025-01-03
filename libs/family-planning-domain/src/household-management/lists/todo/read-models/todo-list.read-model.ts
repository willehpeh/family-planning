export type TodoListReadModel = {
  id: string;
  name: string;
  items: { id: string, name: string, done: boolean }[];
}
