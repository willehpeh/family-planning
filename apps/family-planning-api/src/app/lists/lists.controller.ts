import { Controller, Get } from '@nestjs/common';
import { TaskListsService } from '@family-planning/application';

@Controller('lists')
export class ListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Get()
  async get(): Promise<string> {
    await this.taskListsService.createNewTaskList({ id: '1', name: 'Test list' });
    return 'Hello World!';
  }
}
