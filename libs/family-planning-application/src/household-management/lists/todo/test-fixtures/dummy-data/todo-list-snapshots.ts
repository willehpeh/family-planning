import {
  HouseholdId,
  TodoListId, TodoListItemId,
  TodoListItemName,
  TodoListItemSnapshot,
  TodoListName,
  TodoListSnapshot
} from '@family-planning/domain';

const TEST_HOUSEHOLD_ID = HouseholdId.new();

export const EMPTY_TODO_LIST_SNAPSHOT = new TodoListSnapshot(
  TodoListId.new(),
  new TodoListName('My List'),
  [],
  TEST_HOUSEHOLD_ID
);

export const TODO_LIST_WITH_ONE_ITEM_SNAPSHOT = new TodoListSnapshot(
  TodoListId.new(),
  new TodoListName('My List'),
  [
    new TodoListItemSnapshot(
      TodoListItemId.new(),
      new TodoListItemName('My Item'),
      TEST_HOUSEHOLD_ID
    )
  ],
  TEST_HOUSEHOLD_ID
);

export const TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT = new TodoListSnapshot(
  TodoListId.new(),
  new TodoListName('My List'),
  [
    new TodoListItemSnapshot(
      TodoListItemId.new(),
      new TodoListItemName('My Item'),
      TEST_HOUSEHOLD_ID
    ),
    new TodoListItemSnapshot(
      TodoListItemId.new(),
      new TodoListItemName('My Second Item'),
      TEST_HOUSEHOLD_ID
    )
  ],
  TEST_HOUSEHOLD_ID
);
