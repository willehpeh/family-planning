import {
  HouseholdId,
  TodoListId,
  TodoListItem,
  TodoListItemId,
  TodoListItemName,
  TodoListItemsCommandRepository
} from '@family-planning/domain';
import { CreateTodoListItemCommand } from './create-todo-list-item.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateTodoListItemCommand)
export class CreateTodoListItemCommandHandler implements ICommandHandler<CreateTodoListItemCommand> {
  constructor(private readonly repository: TodoListItemsCommandRepository) {
  }
  async execute({ listId, itemDetails, householdId }: CreateTodoListItemCommand): Promise<void> {
    const id = TodoListItemId.new();
    const item = TodoListItem.new({
      id,
      name: new TodoListItemName(itemDetails.name),
      householdId: HouseholdId.fromString(householdId),
      listId: TodoListId.fromString(listId)
    });
    await this.repository.save(item);
  }
}
