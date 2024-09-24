import { List, ListsRepository } from '@family-planning/domain';

export class InMemoryListsRepository implements ListsRepository {

  private readonly lists: List[] = [];

  find(): Promise<List[]> {
    return Promise.resolve(this.lists);
  }
  save(list: List): Promise<void> {
    this.lists.push(list);
    return Promise.resolve();
  }
}
