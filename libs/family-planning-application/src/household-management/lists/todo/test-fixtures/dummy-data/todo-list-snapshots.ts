import {
  HouseholdId,
  TodoListId, TodoListItemId,
  TodoListItemName,
  TodoListItemSnapshot,
  TodoListName,
  TodoListSnapshot
} from '@family-planning/domain';

export const EMPTY_TODO_LIST_SNAPSHOT = new TodoListSnapshot(
  TodoListId.new(),
  new TodoListName('My List'),
  [],
  HouseholdId.new()
);

export const TODO_LIST_WITH_ONE_ITEM_SNAPSHOT = new TodoListSnapshot(
  TodoListId.new(),
  new TodoListName('My List'),
  [
    new TodoListItemSnapshot(
      TodoListItemId.new(),
      new TodoListItemName('My Item')
    )
  ],
  HouseholdId.new()
);

export const TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT = new TodoListSnapshot(
  TodoListId.new(),
  new TodoListName('My List'),
  [
    new TodoListItemSnapshot(
      TodoListItemId.new(),
      new TodoListItemName('My Item')
    ),
    new TodoListItemSnapshot(
      TodoListItemId.new(),
      new TodoListItemName('My Second Item')
    )
  ],
  HouseholdId.new()
);
