import { HouseholdId, TodoList, TodoListName, TodoListsCommandRepository } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(private readonly todoListsRepository: TodoListsCommandRepository) {
  }

  async execute({ name, householdId }: CreateTodoListCommand): Promise<string> {
    const list = TodoList.new(new TodoListName(name), HouseholdId.fromString(householdId));
    await this.todoListsRepository.save(list);
    return list.snapshot().id();
  }
}
