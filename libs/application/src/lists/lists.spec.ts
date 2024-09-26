import { ListsService } from "./lists.service";
import { List, TaskList } from "@family-planning/domain";
import { InMemoryListsRepository } from "./in-memory.lists.repository";

describe("Lists", () => {
  let listsService: ListsService;
  let listsRepository: InMemoryListsRepository;

  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    listsService = new ListsService(listsRepository);
  });

  describe("Task List creation", () => {
    const listId = "list-id";
    const listName = "New list";

    beforeEach(async () => {
      await listsService.createNewTaskList(listId, listName);
    });

    it("should create one list", async () => {
      const lists: List[] = (await listsRepository.find()) as TaskList[];
      expect(lists.length).toBe(1);
    });

    it("should create the list with the right name", async () => {
      const lists: List[] = await listsRepository.find();
      const list = lists[0] as TaskList;
      const snapshot = list.snapshot();
      expect(snapshot.name()).toBe(listName);
    });

    it("should create the list with no items", async () => {
      const lists: List[] = await listsRepository.find();
      const list = lists[0] as TaskList;
      expect(list.isEmpty()).toBe(true);
    });
  });
});
