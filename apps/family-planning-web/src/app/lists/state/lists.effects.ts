import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ListActions from './lists.actions';
import { ListsService } from '../lists.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ListsEffects {

  private readonly actions$ = inject(Actions);
  private readonly listsService = inject(ListsService);
  private readonly router = inject(Router);

  loadAllLists$ = createEffect(() => this.actions$.pipe(
    ofType(
      ListActions.LoadAllLists,
      ListActions.LoadAllListsFromDetailView
    ),
    switchMap(() => this.listsService.loadAllLists().pipe(
      map(lists => ListActions.LoadAllListsSuccess({ lists })),
      catchError((error: HttpErrorResponse) => of(ListActions.LoadAllListsFailure(error)))
    )),
  ));

  createNewList$ = createEffect(() => this.actions$.pipe(
    ofType(ListActions.CreateList),
    switchMap(({ createListDto }) => this.listsService.createList(createListDto).pipe(
      map(({ id }) => ListActions.CreateListSuccess({ list: { id, name: createListDto.name, items: [] } })),
      catchError((error: HttpErrorResponse) => of(ListActions.CreateListFailure(error)))
    )),
  ));

  createNewListSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ListActions.CreateListSuccess),
    map(() => this.router.navigate(['/lists/todo']))
  ), { dispatch: false });

  addItemToList$ = createEffect(() => this.actions$.pipe(
    ofType(ListActions.CreateListItem),
    mergeMap(({ listId, temporaryItem }) => this.listsService.createListItem(listId, { name: temporaryItem.name }).pipe(
      map(({ id }) => ListActions.CreateListItemSuccess({ listId, temporaryItemId: temporaryItem.id, createdItem: { id, name: temporaryItem.name, done: false } })),
      catchError((error: HttpErrorResponse) => of(ListActions.CreateListItemFailure({ error, listId, temporaryItemId: temporaryItem.id })))
    ))
  ));

  markItemAsDone$ = createEffect(() => this.actions$.pipe(
    ofType(ListActions.MarkItemAsDone),
    mergeMap(({ listId, itemId }) => this.listsService.markItemAsDone(listId, itemId).pipe(
      map(() => ListActions.MarkItemAsDoneSuccess()),
      catchError((error: HttpErrorResponse) => of(ListActions.MarkItemAsDoneFailure({ error, listId, itemId })))
    ))
  ));

  markDoneItemAsPending$ = createEffect(() => this.actions$.pipe(
    ofType(ListActions.MarkDoneItemAsPending),
    mergeMap(({ listId, itemId }) => this.listsService.markDoneItemAsPending(listId, itemId).pipe(
      map(() => ListActions.MarkDoneItemAsPendingSuccess()),
      catchError((error: HttpErrorResponse) => of(ListActions.MarkDoneItemAsPendingFailure({ error, listId, itemId })))
    ))
  ));

}
