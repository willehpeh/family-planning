import { AddItemToTodoListDto } from './add-item-to-todo-list.dto';

export class AddItemToTodoListCommand {

  public readonly listId: string;
  public readonly itemDetails: { name: string };

  constructor({ listId, itemDetails }: AddItemToTodoListDto) {
    this.listId = listId;
    this.itemDetails = itemDetails;
  }
}
