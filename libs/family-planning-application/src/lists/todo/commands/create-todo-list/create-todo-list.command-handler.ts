import { TodoListFactory, TodoListsRepository } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(private readonly todoListsRepository: TodoListsRepository) {
  }

  execute({ name }: CreateTodoListCommand): Promise<void> {
    const listFactory = new TodoListFactory();
    const list = listFactory.createEmptyList(name);
    return this.todoListsRepository.save(list);
  }
}
