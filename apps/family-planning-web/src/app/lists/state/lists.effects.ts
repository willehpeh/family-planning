import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CreateListItem,
  CreateListItemFailure,
  CreateListItemSuccess,
  CreateList,
  CreateListFailure,
  CreateListSuccess,
  LoadAllLists,
  LoadAllListsFailure,
  LoadAllListsFromDetailView,
  LoadAllListsSuccess,
  MarkDoneItemAsPending, MarkDoneItemAsPendingFailure,
  MarkDoneItemAsPendingSuccess,
  MarkItemAsDone,
  MarkItemAsDoneFailure,
  MarkItemAsDoneSuccess
} from './lists.actions';
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
      LoadAllLists,
      LoadAllListsFromDetailView
    ),
    switchMap(() => this.listsService.loadAllLists().pipe(
      map(lists => LoadAllListsSuccess({ lists })),
      catchError((error: HttpErrorResponse) => of(LoadAllListsFailure(error)))
    )),
  ));

  createNewList$ = createEffect(() => this.actions$.pipe(
    ofType(CreateList),
    switchMap(({ createListDto }) => this.listsService.createList(createListDto).pipe(
      map(({ id }) => CreateListSuccess({ listId: id })),
      catchError((error: HttpErrorResponse) => of(CreateListFailure(error)))
    )),
  ));

  createNewListSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateListSuccess),
    map(() => this.router.navigate(['/lists/todo']))
  ), { dispatch: false });

  addItemToList$ = createEffect(() => this.actions$.pipe(
    ofType(CreateListItem),
    mergeMap(({ listId, temporaryItem }) => this.listsService.createListItem(listId, { name: temporaryItem.name }).pipe(
      map(({ id }) => CreateListItemSuccess({ listId, transactionId: temporaryItem.id, itemId: id })),
      catchError((error: HttpErrorResponse) => of(CreateListItemFailure({ error, listId, transactionId: temporaryItem.id })))
    ))
  ));

  addItemToListSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateListItemSuccess),
    map(() => LoadAllListsFromDetailView())
  ));

  markItemAsDone$ = createEffect(() => this.actions$.pipe(
    ofType(MarkItemAsDone),
    mergeMap(({ listId, itemId }) => this.listsService.markItemAsDone(listId, itemId).pipe(
      map(() => MarkItemAsDoneSuccess()),
      catchError((error: HttpErrorResponse) => of(MarkItemAsDoneFailure({ error, listId, itemId })))
    ))
  ));

  markDoneItemAsPending$ = createEffect(() => this.actions$.pipe(
    ofType(MarkDoneItemAsPending),
    mergeMap(({ listId, itemId }) => this.listsService.markDoneItemAsPending(listId, itemId).pipe(
      map(() => MarkDoneItemAsPendingSuccess()),
      catchError((error: HttpErrorResponse) => of(MarkDoneItemAsPendingFailure({ error, listId, itemId })))
    ))
  ));

}
