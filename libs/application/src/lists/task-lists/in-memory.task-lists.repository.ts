import { TaskList, TaskListsRepository } from "@family-planning/domain";

export class InMemoryTaskListsRepository implements TaskListsRepository {
  private readonly lists: TaskList[] = [];

  find(): Promise<TaskList[]> {
    return Promise.resolve(this.lists);
  }
  save(list: TaskList): Promise<void> {
    this.lists.push(list);
    return Promise.resolve();
  }
}
