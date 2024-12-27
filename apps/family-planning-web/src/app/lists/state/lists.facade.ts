import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SerializedTodoList } from '../models/serialized-todo-list';
import { LoadAllLists } from './lists.actions';
import { listsFeature } from './lists.reducer';

@Injectable()
export class ListsFacade {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  allLists(): Signal<SerializedTodoList[]> {
    this.store.dispatch(LoadAllLists());
    return this.store.selectSignal(listsFeature.selectAllLists);
  }

  loading(): Signal<boolean> {
    return this.store.selectSignal(listsFeature.selectLoading);
  }

  openList(id: string): void {
    this.router.navigate(['/lists/todo', id]);
  }

  createList(): void {
    this.router.navigate(['/lists/todo/new']);
  }
}
