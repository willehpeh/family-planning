import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AddItemToTodoListDto, CreateTodoListDto, ItemDetails } from '@family-planning/application';
import { ListsService } from './lists.service';
import { AuthenticatedHouseholdRequest } from '../common/authenticated-household-request';

@Controller('lists')
export class ListsController {

  constructor(private readonly listsService: ListsService) {}

  @Get('todo')
  findAllLists() {
    return this.listsService.findAllLists();
  }

  @Post('todo')
  createTodoList(@Body() createTodoListDto: CreateTodoListDto, @Req() { householdId }: AuthenticatedHouseholdRequest) {
    return this.listsService.createTodoList(createTodoListDto, householdId);
  }

  @Post('todo/:id/add-item')
  addItemToTodoList(@Param('id') listId: string, @Body() itemDetails: ItemDetails) {
    const addItemToTodoListDto: AddItemToTodoListDto = { listId, itemDetails };
    return this.listsService.addItemToTodoList(addItemToTodoListDto);
  }
}
