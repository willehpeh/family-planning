import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AddItemToList,
  AddItemToListFailure,
  AddItemToListSuccess,
  CreateList,
  CreateListFailure,
  CreateListSuccess,
  LoadAllLists,
  LoadAllListsFailure,
  LoadAllListsFromDetailView,
  LoadAllListsSuccess, MarkItemAsDone, MarkItemAsDoneFailure, MarkItemAsDoneSuccess
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
      map(() => CreateListSuccess()),
      catchError((error: HttpErrorResponse) => of(CreateListFailure(error)))
    )),
  ));

  createNewListSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateListSuccess),
    map(() => this.router.navigate(['/lists/todo']))
  ), { dispatch: false });

  addItemToList$ = createEffect(() => this.actions$.pipe(
    ofType(AddItemToList),
    mergeMap(({ listId, temporaryItem }) => this.listsService.addItemToList(listId, { name: temporaryItem.name }).pipe(
      map(() => AddItemToListSuccess()),
      catchError((error: HttpErrorResponse) => of(AddItemToListFailure({ error, listId, transactionId: temporaryItem.id })))
    ))
  ));

  addItemToListSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AddItemToListSuccess),
    map(() => LoadAllListsFromDetailView())
  ));

  markItemAsDone$ = createEffect(() => this.actions$.pipe(
    ofType(MarkItemAsDone),
    mergeMap(({ listId, itemId }) => this.listsService.markItemAsDone(listId, itemId).pipe(
      map(() => MarkItemAsDoneSuccess()),
      catchError((error: HttpErrorResponse) => of(MarkItemAsDoneFailure({ error, listId, itemId })))
    ))
  ));

}
