import { HouseholdId, TodoList, TodoListName, TodoListsCommandRepository } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(private readonly todoListsRepository: TodoListsCommandRepository) {
  }

  execute({ name, householdId }: CreateTodoListCommand): Promise<void> {
    const list = TodoList.new(new TodoListName(name), HouseholdId.fromString(householdId));
    return this.todoListsRepository.save(list);
  }
}
