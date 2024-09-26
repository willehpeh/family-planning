import { CreateListProperties, TaskListBuilder, TaskListsRepository } from '@family-planning/domain';

export class TaskListsService {
  constructor(private listsRepository: TaskListsRepository) {}

  createNewTaskList({ id, name }: CreateListProperties): Promise<void> {
    const builder = new TaskListBuilder(id, name);
    const list = builder.build();
    return this.listsRepository.save(list);
  }
}
