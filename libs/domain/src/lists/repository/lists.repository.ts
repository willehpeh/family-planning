import { List } from '../entities';

export interface ListsRepository {
  find(): Promise<List[]>;
  save(list: List): Promise<void>;
}
