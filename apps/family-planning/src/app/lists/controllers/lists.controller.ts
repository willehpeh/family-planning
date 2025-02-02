import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateTodoListItemDto, MarkDoneItemAsPendingDto, MarkItemAsDoneDto } from '@family-planning/application';
import { ListsService } from '../providers/lists.service';
import { AuthenticatedHouseholdRequest } from '../../common/authenticated-household-request';
import { POSTCreateTodoListDto } from '../dtos/POST.create-todo-list.dto';
import { POSTAddItemToTodoListDto } from '../dtos/POST.add-item-to-todo-list.dto';
import { POSTMarkItemAsDoneDto } from '../dtos/POST.mark-item-as-done.dto';
import { POSTMarkDoneItemAsPendingDto } from '../dtos/POST.mark-done-item-as-pending.dto';

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
  addItemToTodoList(@Param('id') listId: string,
                    @Body() itemDetails: POSTAddItemToTodoListDto,
                    @Req() { householdId }: AuthenticatedHouseholdRequest) {
    const addItemToTodoListDto: CreateTodoListItemDto = { listId, itemDetails, householdId };
    return this.listsService.addItemToTodoList(addItemToTodoListDto);
  }

  @Post('todo/:id/mark-item-as-done')
  markItemAsDone(@Param('id') todoListId: string, @Body() { itemId }: POSTMarkItemAsDoneDto) {
    const markItemAsDoneDto: MarkItemAsDoneDto = { itemId, todoListId };
    return this.listsService.markItemAsDone(markItemAsDoneDto);
  }

  @Post('todo/:id/mark-done-item-as-pending')
  markDoneItemAsPending(@Param('id') todoListId: string, @Body() { itemId }: POSTMarkDoneItemAsPendingDto) {
    const markDoneItemAsPendingDto: MarkDoneItemAsPendingDto = { itemId, todoListId };
    return this.listsService.markDoneItemAsPending(markDoneItemAsPendingDto);
  }
}
