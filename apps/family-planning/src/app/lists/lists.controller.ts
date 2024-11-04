import { Body, Controller, Post } from '@nestjs/common';
import { CreateTodoListDto } from '@family-planning/application';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {

  constructor(private readonly listsService: ListsService) {}

  @Post('todo')
  createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return this.listsService.createTodoList(createTodoListDto);
  }
}
