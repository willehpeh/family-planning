import { CreateTodoListItemDto } from './create-todo-list-item.dto';

export class CreateTodoListItemCommand {

  public readonly listId: string;
  public readonly householdId: string;
  public readonly itemDetails: { name: string };

  constructor({ listId, itemDetails, householdId }: CreateTodoListItemDto) {
    this.listId = listId;
    this.itemDetails = itemDetails;
    this.householdId = householdId;
  }
}
