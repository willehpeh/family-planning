import {
  HouseholdId,
  TodoListId,
  TodoListItemId,
  TodoListItemName,
  TodoListItemSnapshot,
  TodoListItemStatus,
  TodoListName,
  TodoListSnapshot
} from '@family-planning/domain';

export const TEST_HOUSEHOLD_ID = HouseholdId.new();
export const TEST_TODO_LIST_ID = TodoListId.new();
export const TEST_TODO_LIST_ITEM_ID = TodoListItemId.new();
export const TEST_OTHER_TODO_LIST_ITEM_ID = TodoListItemId.new();

export const EMPTY_TODO_LIST_SNAPSHOT = new TodoListSnapshot({
  id: TEST_TODO_LIST_ID,
  name: new TodoListName('My List'),
  items: [],
  householdId: TEST_HOUSEHOLD_ID
});

export const TODO_LIST_WITH_ONE_ITEM_SNAPSHOT = new TodoListSnapshot({
  id: TEST_TODO_LIST_ID,
  name: new TodoListName('My List'),
  items: [
    new TodoListItemSnapshot({
      id: TEST_TODO_LIST_ITEM_ID,
      name: new TodoListItemName('My Item'),
      householdId: TEST_HOUSEHOLD_ID,
      status: new TodoListItemStatus('pending'),
    })
  ],
  householdId: TEST_HOUSEHOLD_ID
});

export const TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT = new TodoListSnapshot({
  id: TEST_TODO_LIST_ID,
  name: new TodoListName('My List'),
  items: [
    new TodoListItemSnapshot({
      id: TEST_TODO_LIST_ITEM_ID,
      name: new TodoListItemName('My Item'),
      householdId: TEST_HOUSEHOLD_ID,
      status: new TodoListItemStatus('pending'),
    }),
  new TodoListItemSnapshot({
    id: TEST_OTHER_TODO_LIST_ITEM_ID,
    name: new TodoListItemName('My Second Item'),
    householdId: TEST_HOUSEHOLD_ID,
    status: new TodoListItemStatus('pending'),
  })
],
householdId: TEST_HOUSEHOLD_ID
});

export const TODO_LIST_WITH_ONE_COMPLETED_ITEM_SNAPSHOT = new TodoListSnapshot({
  id: TEST_TODO_LIST_ID,
  name: new TodoListName('My List'),
  items: [
    new TodoListItemSnapshot({
      id: TEST_TODO_LIST_ITEM_ID,
      name: new TodoListItemName('My Item'),
      householdId: TEST_HOUSEHOLD_ID,
      status: new TodoListItemStatus('done'),
      dateCompleted: new Date()
    })
    ],
  householdId: TEST_HOUSEHOLD_ID
});

export const RANDOM_EMPTY_TODO_LIST = () => new TodoListSnapshot({
  id: TodoListId.new(),
  name: new TodoListName('Random List'),
  items: [],
  householdId: HouseholdId.new()
});
