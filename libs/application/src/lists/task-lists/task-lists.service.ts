import {
  CreateListProperties,
  CreateTaskProperties,
  TaskListBuilder,
  TaskListsRepository,
} from '@family-planning/domain';

export class TaskListsService {
  constructor(private listsRepository: TaskListsRepository) {}

  createNewTaskList({ id, name }: CreateListProperties): Promise<void> {
    const builder = new TaskListBuilder(id, name);
    const list = builder.build();
    return this.listsRepository.save(list);
  }

  async addTaskToList(listId: string, taskProps: CreateTaskProperties): Promise<void> {
    const list = await this.listsRepository.findById(listId);
    list.addTask(taskProps);
    return this.listsRepository.save(list);
  }
}
