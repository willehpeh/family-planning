import { createAction, props } from '@ngrx/store';
import { SerializedTodoList } from '../models/serialized-todo-list';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateTodoListDto } from '@family-planning/application';
import { SerializedTodoListItem } from '../models/serialized-todo-list-item';

export const LoadAllLists = createAction(
  '[TodoListsListComponent] Load All Lists'
);

export const LoadAllListsFromDetailView = createAction(
  '[TodoListsDetailComponent] Load All Lists From Detail View'
);

export const LoadAllListsSuccess = createAction(
  '[Lists API] Load All Lists Success',
  props<{ lists: SerializedTodoList[] }>()
);

export const LoadAllListsFailure = createAction(
  '[Lists API] Load All Lists Failure',
  props<{ error: HttpErrorResponse }>()
);

export const CreateList = createAction(
  '[CreateListFormComponent] Create List',
  props<CreateTodoListDto>()
);

export const CreateListSuccess = createAction(
  '[Lists API] Create List Success',
);

export const CreateListFailure = createAction(
  '[Lists API] Create List Failure',
  props<{ error: HttpErrorResponse }>()
);

export const AddItemToList = createAction(
  '[TodoListsDetailComponent] Add Item to List',
  props<{ listId: string, temporaryItem: SerializedTodoListItem }>()
);

export const AddItemToListSuccess = createAction(
  '[Lists API] Add Item to List Success',
);

export const AddItemToListFailure = createAction(
  '[Lists API] Add Item to List Failure',
  props<{ error: HttpErrorResponse, listId: string, transactionId: string }>()
);
