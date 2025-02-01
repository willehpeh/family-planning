import { EventsHandler } from '@nestjs/cqrs';
import { TodoListItemCreatedEvent, TodoListsCommandRepository } from '@family-planning/domain';

@EventsHandler(TodoListItemCreatedEvent)
export class TodoListItemCreatedEventHandler {

  constructor(private listsRepository: TodoListsCommandRepository) {}

  async handle(event: TodoListItemCreatedEvent) {
    const list = await this.listsRepository.findById(event.listId.value());
    try {
      list.addItem(event.id);
    } catch (error) {
      return Promise.reject(error);
    }
    await this.listsRepository.save(list);
  }
}
