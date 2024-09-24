import { List } from './List';

export interface ListsRepository {
  find(): Promise<List[]>;
  save(list: List): Promise<void>;
}
