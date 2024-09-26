import { TaskList } from "../entities";

export interface TaskListsRepository {
  find(): Promise<TaskList[]>;
  save(list: TaskList): Promise<void>;
}
