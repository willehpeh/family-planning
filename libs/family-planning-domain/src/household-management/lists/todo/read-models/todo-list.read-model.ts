import { TodoListSnapshot } from '../entities';

export class TodoListReadModel {
  id: string;
  name: string;
  items: { name: string }[];

  constructor(snapshot: TodoListSnapshot) {
    this.id = snapshot.id();
    this.name = snapshot.name();
    this.items = snapshot.items().map(item => ({ name: item.name() }));
  }
}
