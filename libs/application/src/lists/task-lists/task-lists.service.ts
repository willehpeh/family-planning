import {
  CreateListProperties,
  CreateTaskProperties,
  TaskListBuilder,
  TaskListsRepository,
} from '@family-planning/domain';

export class TaskListsService {
  constructor(private listsRepository: TaskListsRepository) {}

  createNewTaskList({ name }: CreateListProperties): Promise<void> {
    const builder = new TaskListBuilder(name);
    const list = builder.build();
    return this.listsRepository.save(list);
  }

  async addTaskToList(listId: string, taskProps: CreateTaskProperties): Promise<void> {
    const list = await this.listsRepository.findById(listId);
    list.addTask(taskProps);
    return this.listsRepository.save(list);
  }
}
