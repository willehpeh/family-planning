import { TaskList } from '../entities';

export interface TaskListsRepository {
  find(): Promise<TaskList[]>;
  findById(id: string): Promise<TaskList>;
  save(list: TaskList): Promise<void>;
}
