import { TaskListsService } from './task-lists.service';
import { CreateListProperties, CreateTaskProperties, TaskList, TaskListBuilder } from '@family-planning/domain';
import { InMemoryTaskListsRepository } from './in-memory.task-lists.repository';

describe("Task lists", () => {
  let taskListsService: TaskListsService;
  let listsRepository: InMemoryTaskListsRepository;

  beforeEach(() => {
    listsRepository = new InMemoryTaskListsRepository();
    taskListsService = new TaskListsService(listsRepository);
  });

  describe("Creation", () => {
    const createListProperties: CreateListProperties = {
      name: "New list",
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
      const snapshot = lists[0].snapshot();
      expect(snapshot.name()).toBe(createListProperties.name);
    });

    it("should create the list with no tasks", async () => {
      const lists: TaskList[] = await listsRepository.find();
      const snapshot = lists[0].snapshot();
      expect(snapshot.tasks()).toEqual([]);
    });
  });

  describe("Adding tasks", () => {

    let list: TaskList;
    let listId: string;

    const createTaskProperties: CreateTaskProperties = {
      name: 'task-name',
    };

    beforeEach(async () => {
      const newList = new TaskListBuilder("list-name").build();
      await listsRepository.save(newList);
      list = (await listsRepository.find())[0];
      listId = list.snapshot().id();
    });

    it("should add one task to the list", async () => {
      await taskListsService.addTaskToList(listId, createTaskProperties);
      const snapshot = list.snapshot();
      expect(snapshot.tasks().length).toBe(1);
    });

    it('should add a task with the right name', async () => {
      await taskListsService.addTaskToList(listId, createTaskProperties);
      const snapshot = list.snapshot();
      expect(snapshot.tasks()[0].name()).toBe(createTaskProperties.name);
    });

    it('should create a task with status "pending"', async () => {
      await taskListsService.addTaskToList(listId, createTaskProperties);
      const snapshot = list.snapshot();
      expect(snapshot.tasks()[0].status()).toBe('pending');
    });

    it('should create a task with today as created date', async () => {
      await taskListsService.addTaskToList(listId, createTaskProperties);
      const snapshot = list.snapshot();
      expect(snapshot.tasks()[0].createdAt()).toBe(new Date().toISOString().split('T')[0]);
    });
  });
});
