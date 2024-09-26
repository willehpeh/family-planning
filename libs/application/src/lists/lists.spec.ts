import { ListsService } from "./lists.service";
import { List } from "@family-planning/domain";
import { InMemoryListsRepository } from "./in-memory.lists.repository";

describe("Lists", () => {
  let listsService: ListsService;
  let listsRepository: InMemoryListsRepository;

  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    listsService = new ListsService(listsRepository);
  });

  describe("Task List creation", () => {
    const listName = "New list";

    beforeEach(async () => {
      await listsService.createNewTaskList(listName);
    });

    it("should create one list", async () => {
      const lists: List[] = await listsRepository.find();
      expect(lists.length).toBe(1);
    });

    it("should create the list with the right name", async () => {
      const lists: List[] = await listsRepository.find();
      expect(lists[0].name()).toBe(listName);
    });

    it("should create the list with no items", async () => {
      const lists: List[] = await listsRepository.find();
      expect(lists[0].isEmpty()).toBe(true);
    });

    it("should create a task list", async () => {
      const lists: List[] = await listsRepository.find();
      expect(lists[0].type()).toBe("task");
    });
  });
});
