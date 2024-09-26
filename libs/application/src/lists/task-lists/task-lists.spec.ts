import { TaskListsService } from "./task-lists.service";
import { TaskList } from "@family-planning/domain";
import { InMemoryTaskListsRepository } from "./in-memory.task-lists.repository";

describe("Task lists", () => {
  let taskListsService: TaskListsService;
  let listsRepository: InMemoryTaskListsRepository;

  beforeEach(() => {
    listsRepository = new InMemoryTaskListsRepository();
    taskListsService = new TaskListsService(listsRepository);
  });

  describe("Creation", () => {
    const createListProperties = {
      id: 'list-id',
      name: 'New list'
    };

    beforeEach(async () => {
      await taskListsService.createNewTaskList(createListProperties);
    });

    it("should create one list", async () => {
      const lists: TaskList[] = await listsRepository.find();
      expect(lists.length).toBe(1);
    });

    it("should create the list with the right name", async () => {
      const lists: TaskList[] = await listsRepository.find();
      const list = lists[0];
      const snapshot = list.snapshot();
      expect(snapshot.name()).toBe(createListProperties.name);
    });

    it("should create the list with no items", async () => {
      const lists: TaskList[] = await listsRepository.find();
      const list = lists[0];
      expect(list.isEmpty()).toBe(true);
    });
  });
});
