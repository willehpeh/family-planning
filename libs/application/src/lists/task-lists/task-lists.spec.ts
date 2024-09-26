import { TaskListsService } from "./task-lists.service";
import { List, TaskList } from "@family-planning/domain";
import { InMemoryTaskListsRepository } from "./in-memory.task-lists.repository";

describe("Lists", () => {
  let taskListsService: TaskListsService;
  let listsRepository: InMemoryTaskListsRepository;

  beforeEach(() => {
    listsRepository = new InMemoryTaskListsRepository();
    taskListsService = new TaskListsService(listsRepository);
  });

  describe("Task List creation", () => {
    const listId = "list-id";
    const listName = "New list";

    beforeEach(async () => {
      await taskListsService.createNewTaskList(listId, listName);
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
