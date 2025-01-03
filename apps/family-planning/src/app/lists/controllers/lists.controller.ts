import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AddItemToTodoListDto, MarkItemAsDoneDto } from '@family-planning/application';
import { ListsService } from '../providers/lists.service';
import { AuthenticatedHouseholdRequest } from '../../common/authenticated-household-request';
import { POSTCreateTodoListDto } from '../dtos/POST.create-todo-list.dto';
import { POSTAddItemToTodoListDto } from '../dtos/POST.add-item-to-todo-list.dto';
import { POSTMarkItemAsDoneDto } from '../dtos/POST.mark-item-as-done.dto';

@Controller('lists')
export class ListsController {

  constructor(private readonly listsService: ListsService) {}

  @Get('todo')
  findAllLists() {
    return this.listsService.findAllLists();
  }

  @Post('todo')
  createTodoList(@Body() createTodoListDto: POSTCreateTodoListDto, @Req() { householdId }: AuthenticatedHouseholdRequest) {
    return this.listsService.createTodoList(createTodoListDto, householdId);
  }

  @Post('todo/:id/add-item')
  addItemToTodoList(@Param('id') listId: string, @Body() itemDetails: POSTAddItemToTodoListDto) {
    const addItemToTodoListDto: AddItemToTodoListDto = { listId, itemDetails };
    return this.listsService.addItemToTodoList(addItemToTodoListDto);
  }

  @Post('todo/:id/mark-item-as-done')
  markItemAsDone(@Param('id') todoListId: string, @Body() { itemId }: POSTMarkItemAsDoneDto) {
    const markItemAsDoneDto: MarkItemAsDoneDto = { itemId, todoListId };
    return this.listsService.markItemAsDone(markItemAsDoneDto);
  }
}
