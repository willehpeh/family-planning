import { TodoListFactory, TodoListsCommandRepository } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(private readonly todoListsRepository: TodoListsCommandRepository) {
  }

  execute({ name, householdId }: CreateTodoListCommand): Promise<void> {
    const listFactory = new TodoListFactory();
    const list = listFactory.createEmptyList(name, householdId);
    return this.todoListsRepository.save(list);
  }
}
