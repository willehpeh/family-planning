import { Body, Controller, Post } from '@nestjs/common';
import { AddItemToTodoListDto, CreateTodoListDto } from '@family-planning/application';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {

  constructor(private readonly listsService: ListsService) {}

  @Post('todo')
  createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return this.listsService.createTodoList(createTodoListDto);
  }

  @Post('todo/item')
  addItemToTodoList(@Body() addItemToTodoListDto: AddItemToTodoListDto) {
    return this.listsService.addItemToTodoList(addItemToTodoListDto);
  }
}
