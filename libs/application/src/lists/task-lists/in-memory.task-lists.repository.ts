import { TaskList, TaskListsRepository } from "@family-planning/domain";

export class InMemoryTaskListsRepository implements TaskListsRepository {
  private readonly lists: TaskList[] = [];

  find(): Promise<TaskList[]> {
    return Promise.resolve(this.lists);
  }

  findById(id: string): Promise<TaskList> {
    const list = this.lists.find(list => list.snapshot().id() === id);
    if (list) {
      return Promise.resolve(list);
    } else {
      return Promise.reject(new Error('List not found'));
    }
  }

  save(list: TaskList): Promise<void> {
    this.lists.push(list);
    return Promise.resolve();
  }
}
