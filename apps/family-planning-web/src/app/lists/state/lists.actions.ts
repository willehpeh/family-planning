import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateTodoListDto } from '@family-planning/application';
import { SerializedTodoListItem } from '../models/serialized-todo-list-item';
import { TodoListReadModel } from '@family-planning/domain';

export const LoadAllLists = createAction(
  '[TodoListsListComponent] Load All Lists'
);

export const LoadAllListsFromDetailView = createAction(
  '[TodoListsDetailComponent] Load All Lists From Detail View'
);

export const LoadAllListsSuccess = createAction(
  '[Lists API] Load All Lists Success',
  props<{ lists: TodoListReadModel[] }>()
);

export const LoadAllListsFailure = createAction(
  '[Lists API] Load All Lists Failure',
  props<{ error: HttpErrorResponse }>()
);

export const CreateList = createAction(
  '[CreateListFormComponent] Create List',
  props<{ createListDto: CreateTodoListDto }>()
);

export const CreateListSuccess = createAction(
  '[Lists API] Create List Success',
  props<{ listId: string }>()
);

export const CreateListFailure = createAction(
  '[Lists API] Create List Failure',
  props<{ error: HttpErrorResponse }>()
);

export const CreateListItem = createAction(
  '[TodoListsDetailComponent] Create List Item',
  props<{ listId: string, temporaryItem: SerializedTodoListItem }>()
);

export const CreateListItemSuccess = createAction(
  '[Lists API] Create List Item Success',
  props<{ listId: string, transactionId: string, itemId: string }>()
);

export const CreateListItemFailure = createAction(
  '[Lists API] Create List Item Failure',
  props<{ error: HttpErrorResponse, listId: string, transactionId: string }>()
);

export const MarkItemAsDone = createAction(
  '[TodoListsDetailComponent] Mark Item as Done',
  props<{ listId: string, itemId: string }>()
);

export const MarkItemAsDoneSuccess = createAction(
  '[Lists API] Mark Item as Done Success',
);

export const MarkItemAsDoneFailure = createAction(
  '[Lists API] Mark Item as Done Failure',
  props<{ error: HttpErrorResponse, listId: string, itemId: string }>()
);

export const MarkDoneItemAsPending = createAction(
  '[TodoListsDetailComponent] Mark Done Item as Pending',
  props<{ listId: string, itemId: string }>()
);

export const MarkDoneItemAsPendingSuccess = createAction(
  '[Lists API] Mark Done Item as Pending Success',
);

export const MarkDoneItemAsPendingFailure = createAction(
  '[Lists API] Mark Done Item as Pending Failure',
  props<{ error: HttpErrorResponse, listId: string, itemId: string }>()
);

export const ToggleDisplayCompletedItems = createAction(
  '[TodoListsDetailComponent] Toggle Display Completed Items',
);
