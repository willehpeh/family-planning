import { ListBuilder, ListsRepository } from "@family-planning/domain";

export class ListsService {
  constructor(private listsRepository: ListsRepository) {}

  createNewList(name: string): Promise<void> {
    const builder = new ListBuilder(name);
    const list = builder.build();
    return this.listsRepository.save(list);
  }
}
