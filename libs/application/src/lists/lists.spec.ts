import { ListsService } from './lists.service';
import { List, ListsRepository } from '@family-planning/domain';
import { InMemoryListsRepository } from './in-memory.lists.repository';

describe('Lists', () => {

  let listsService: ListsService;
  let listsRepository: ListsRepository;

  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    listsService = new ListsService(listsRepository);
  })

  it('should create and persist one new empty list', async () => {
    await listsService.createNewList('New list');
    const lists: List[] = await listsRepository.find();
    expect(lists.length).toBe(1);
    expect(lists[0].name()).toBe('New list');
    expect(lists[0].isEmpty()).toBe(true);
  });
});
