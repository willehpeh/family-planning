import { createAction, props } from '@ngrx/store';
import { SerializedTodoList } from '../models/serialized-todo-list';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateTodoListDto } from '@family-planning/application';

export const LoadAllLists = createAction(
  '[TodoListsListComponent] Load All Lists'
);

export const LoadAllListsSuccess = createAction(
  '[TodoListsListComponent] Load All Lists Success',
  props<{ lists: SerializedTodoList[] }>()
);

export const LoadAllListsFailure = createAction(
  '[TodoListsListComponent] Load All Lists Failure',
  props<{ error: HttpErrorResponse }>()
);

export const CreateList = createAction(
  '[Lists] Create List',
  props<CreateTodoListDto>()
);

export const CreateListSuccess = createAction(
  '[Lists] Create List Success',
);

export const CreateListFailure = createAction(
  '[Lists] Create List Failure',
  props<{ error: HttpErrorResponse }>()
);
