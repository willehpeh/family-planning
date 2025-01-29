import { CreateTotoListItemDto } from './create-toto-list-item.dto';

export class CreateTodoListItemCommand {

  public readonly listId: string;
  public readonly itemDetails: { name: string };

  constructor({ listId, itemDetails }: CreateTotoListItemDto) {
    this.listId = listId;
    this.itemDetails = itemDetails;
  }
}
