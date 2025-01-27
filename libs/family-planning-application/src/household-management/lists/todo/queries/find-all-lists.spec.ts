import {
  InMemoryTodoListItemsQueryRepository,
  InMemoryTodoListsQueryRepository,
  RANDOM_EMPTY_TODO_LIST
} from '../test-fixtures';
import { FindAllListsQuery, FindAllListsQueryHandler } from '.';
import { TodoListReadModel, TodoListSnapshot } from '@family-planning/domain';

describe('Find all todo lists', () => {
  let query: FindAllListsQuery;
  let findAllListsQueryHandler: FindAllListsQueryHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsQueryRepository;
  let inMemoryTodoListItemsRepository: InMemoryTodoListItemsQueryRepository;

  beforeEach(() => {
    query = new FindAllListsQuery();
  });

  describe('No lists in persistence', () => {
    beforeEach(() => {
      inMemoryTodoListsRepository = new InMemoryTodoListsQueryRepository();
      inMemoryTodoListItemsRepository = new InMemoryTodoListItemsQueryRepository();
      findAllListsQueryHandler = new FindAllListsQueryHandler(
        inMemoryTodoListsRepository,
        inMemoryTodoListItemsRepository
      );
    });

    it('should return an empty array when there are no lists', async () => {
      const result = await findAllListsQueryHandler.execute(query);
      expect(result).toEqual([]);
    });
  });

  describe('Empty lists in persistence', () => {
    let snapshots: TodoListSnapshot[];

    beforeEach(() => {
      snapshots = [
        RANDOM_EMPTY_TODO_LIST(),
        RANDOM_EMPTY_TODO_LIST(),
        RANDOM_EMPTY_TODO_LIST()
      ];
      inMemoryTodoListsRepository = new InMemoryTodoListsQueryRepository().withSnapshots(snapshots);
      findAllListsQueryHandler = new FindAllListsQueryHandler(
        inMemoryTodoListsRepository,
        inMemoryTodoListItemsRepository
      );
    });

    it('should return the lists in persistence as read models', async () => {
      const result = await findAllListsQueryHandler.execute(query);
      expect(result).toEqual(snapshots.map(snapshot => ({
        id: snapshot.id(),
        name: snapshot.name(),
        items: []
      } as TodoListReadModel)));
    });
  });


});
