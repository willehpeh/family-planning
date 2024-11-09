import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CreateList,
  CreateListFailure,
  CreateListSuccess,
  LoadAllLists,
  LoadAllListsFailure,
  LoadAllListsSuccess
} from './lists.actions';
import { ListsService } from '../lists.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ListsEffects {

  private readonly actions$ = inject(Actions);
  private readonly listsService = inject(ListsService);
  private readonly router = inject(Router);

  loadAllLists$ = createEffect(() => this.actions$.pipe(
    ofType(LoadAllLists),
    switchMap(() => this.listsService.loadAllLists().pipe(
      map(lists => LoadAllListsSuccess({ lists })),
      catchError((error: HttpErrorResponse) => of(LoadAllListsFailure(error)))
    )),
  ));

  createNewList$ = createEffect(() => this.actions$.pipe(
    ofType(CreateList),
    switchMap(createListDto => this.listsService.createList(createListDto).pipe(
      map(() => CreateListSuccess()),
      catchError((error: HttpErrorResponse) => of(CreateListFailure(error)))
    )),
  ));

  createNewListSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateListSuccess),
    map(() => this.router.navigate(['/lists/todo']))
  ), { dispatch: false })

}
