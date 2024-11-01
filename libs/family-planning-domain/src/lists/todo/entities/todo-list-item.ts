import { Entity } from '../../../common';
import { TodoListItemSnapshot } from './snapshots';

export class TodoListItem implements Entity<TodoListItemSnapshot> {
  snapshot(): TodoListItemSnapshot {
    return new TodoListItemSnapshot();
  }
}
