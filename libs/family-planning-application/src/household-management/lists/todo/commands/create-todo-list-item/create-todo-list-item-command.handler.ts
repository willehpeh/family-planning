import {
  EventBus,
  HouseholdId,
  TodoListId,
  TodoListItem,
  TodoListItemId,
  TodoListItemName,
  TodoListItemsCommandRepository,
  TodoListsCommandRepository
} from '@family-planning/domain';
import { CreateTodoListItemCommand } from './create-todo-list-item.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateTodoListItemCommand)
export class CreateTodoListItemCommandHandler implements ICommandHandler<CreateTodoListItemCommand> {
  constructor(private readonly listsRepository: TodoListsCommandRepository,
              private readonly itemsRepository: TodoListItemsCommandRepository,
              private readonly eventBus: EventBus) {
  }

  async execute({ listId, itemDetails, householdId }: CreateTodoListItemCommand): Promise<{ id: string }> {
    await this.listsRepository.findById(listId);
    const id = TodoListItemId.new();
    const item = TodoListItem.new({
      id,
      name: new TodoListItemName(itemDetails.name),
      householdId: HouseholdId.fromString(householdId),
      listId: TodoListId.fromString(listId)
    });
    await this.itemsRepository.save(item);
    item.events().forEach(event => this.eventBus.publish(event));
    item.clearEvents();
    return { id: id.value() };
  }
}
