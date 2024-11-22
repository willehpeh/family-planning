import {
  EMPTY_TODO_LIST_SNAPSHOT,
  InMemoryTodoListsQueriesRepository,
  TODO_LIST_WITH_ONE_ITEM_SNAPSHOT,
  TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT
} from '../test-fixtures';
import { FindAllListsQuery } from './find-all-lists.query';
import { FindAllListsQueryHandler } from './find-all-lists.query-handler';
import { TodoListReadModel, TodoListSnapshot } from '@family-planning/domain';

describe('Find all todo lists', () => {
  let query: FindAllListsQuery;
  let findAllListsQueryHandler: FindAllListsQueryHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsQueriesRepository;

  beforeEach(() => {
    query = new FindAllListsQuery();
  });

  describe('No lists in persistence', () => {
    beforeEach(() => {
      inMemoryTodoListsRepository = new InMemoryTodoListsQueriesRepository();
      findAllListsQueryHandler = new FindAllListsQueryHandler(inMemoryTodoListsRepository);
    });

    it('should return an empty array when there are no lists', async () => {
      const result = await findAllListsQueryHandler.execute(query);
      expect(result).toEqual([]);
    });
  });

  describe('Lists in persistence', () => {
    let snapshots: TodoListSnapshot[];

    beforeEach(() => {
      snapshots = [
        EMPTY_TODO_LIST_SNAPSHOT,
        TODO_LIST_WITH_ONE_ITEM_SNAPSHOT,
        TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT
      ];
      inMemoryTodoListsRepository = new InMemoryTodoListsQueriesRepository().withSnapshots(snapshots);
      findAllListsQueryHandler = new FindAllListsQueryHandler(inMemoryTodoListsRepository);
    });

    it('should return the lists in persistence as read models', async () => {
      const result = await findAllListsQueryHandler.execute(query);
      expect(result).toEqual(snapshots.map(snapshot => new TodoListReadModel(snapshot)));
    });
  });

});
