import { TaskListsRepository, TaskListBuilder } from '@family-planning/domain';

export class TaskListsService {
  constructor(private listsRepository: TaskListsRepository) {}

  createNewTaskList(id: string, name: string): Promise<void> {
    const builder = new TaskListBuilder(id, name);
    const list = builder.build();
    return this.listsRepository.save(list);
  }
}
