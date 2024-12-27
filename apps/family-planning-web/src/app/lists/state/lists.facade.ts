import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SerializedTodoList } from '../models/serialized-todo-list';
import { AddItemToList, LoadAllLists, LoadAllListsFromDetailView } from './lists.actions';
import { listsFeature } from './lists.reducer';
import { ItemDetails } from '@family-planning/application';
import { SerializedTodoListItemFactory } from '../models/factories/serialized-todo-list-item.factory';

@Injectable()
export class ListsFacade {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  allLists(): Signal<SerializedTodoList[]> {
    this.store.dispatch(LoadAllLists());
    return this.store.selectSignal(listsFeature.selectAllLists);
  }

  listWithId(id: string): SerializedTodoList | undefined {
    const list = this.store.selectSignal(listsFeature.selectListById(id));
    if (!list()) {
      this.store.dispatch(LoadAllListsFromDetailView());
    }
    return list();
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

  addItemToList(listId: string, item: ItemDetails): void {
    this.store.dispatch(AddItemToList({
      listId,
      temporaryItem: SerializedTodoListItemFactory.temporaryItem(item)
    }));
  }
}
