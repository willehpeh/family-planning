import { TodoListItem, TodoListItemsCommandRepository } from '@family-planning/domain';

export class InMemoryTodoListItemsCommandRepository implements TodoListItemsCommandRepository {

  items: Record<string, TodoListItem> = {};

  save(item: TodoListItem): Promise<void> {
    this.items[item.snapshot().id()] = item;
    return Promise.resolve();
  }

  itemsArray(): TodoListItem[] {
    return Object.values(this.items);
  }

  findById(id: string): Promise<TodoListItem> {
    return Promise.resolve(this.items[id]);
  }

  withItems(items: TodoListItem[]): InMemoryTodoListItemsCommandRepository {
    items.forEach(item => this.items[item.snapshot().id()] = item);
    return this;
  }
}
