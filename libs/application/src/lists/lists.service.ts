import { ListsRepository, TaskListBuilder } from '@family-planning/domain';

export class ListsService {
  constructor(private listsRepository: ListsRepository) {}

  createNewTaskList(id: string, name: string): Promise<void> {
    const builder = new TaskListBuilder(id, name);
    const list = builder.build();
    return this.listsRepository.save(list);
  }
}
