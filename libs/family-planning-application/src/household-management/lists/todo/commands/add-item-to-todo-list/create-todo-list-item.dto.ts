export type CreateTodoListItemDto = {
  listId: string;
  householdId: string;
  itemDetails: {
    name: string;
  }
}
