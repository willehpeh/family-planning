import { List, ListsRepository } from '@family-planning/domain';

export class ListsService {
  constructor(private listsRepository: ListsRepository) {
  }

  createNewList(name: string): Promise<void> {
    const list = new List(name);
    return this.listsRepository.save(list);
  }
}
