import { ListBuilder, ListsRepository } from "@family-planning/domain";

export class ListsService {
  constructor(private listsRepository: ListsRepository) {}

  createNewTaskList(name: string): Promise<void> {
    const builder = new ListBuilder(name, 'task');
    const list = builder.build();
    return this.listsRepository.save(list);
  }
}
