import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadAllLists, LoadAllListsFailure, LoadAllListsSuccess } from './lists.actions';
import { ListsService } from '../lists.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ListsEffects {

  private readonly actions$ = inject(Actions);
  private readonly listsService = inject(ListsService);

  loadAllLists$ = createEffect(() => this.actions$.pipe(
    ofType(LoadAllLists),
    switchMap(() => this.listsService.loadAllLists().pipe(
      map(lists => LoadAllListsSuccess(lists)),
      catchError((error: HttpErrorResponse) => of(LoadAllListsFailure(error)))
    )),
  ));

}
