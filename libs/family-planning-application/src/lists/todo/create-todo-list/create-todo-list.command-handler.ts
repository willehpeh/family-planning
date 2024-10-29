import { TodoList, TodoListsRepository } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(private readonly todoListsRepository: TodoListsRepository) {
  }

  async execute({ name }: CreateTodoListCommand): Promise<void> {
    const list = new TodoList(name);
    return this.todoListsRepository.save(list);
  }
}
