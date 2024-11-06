import { createAction } from '@ngrx/store';
import { TodoList } from '../models/todo-list';
import { HttpErrorResponse } from '@angular/common/http';

export const LoadAllLists = createAction(
  '[Lists] Load All Lists'
);

export const LoadAllListsSuccess = createAction(
  '[Lists] Load All Lists Success',
  (lists: TodoList[]) => ({ lists })
);

export const LoadAllListsFailure = createAction(
  '[Lists] Load All Lists Failure',
  (error: HttpErrorResponse) => ({ error })
);
