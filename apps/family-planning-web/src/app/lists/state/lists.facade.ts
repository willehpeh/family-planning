import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NullTodoListReadModel } from '../models/serialized-todo-list';
import {
  AddItemToList,
  LoadAllLists,
  LoadAllListsFromDetailView,
  MarkItemAsDone,
  ToggleDisplayCompletedItems
} from './lists.actions';
import { listsFeature } from './lists.reducer';
import { ItemDetails } from '@family-planning/application';
import { SerializedTodoListItemFactory } from '../models/factories/serialized-todo-list-item.factory';
import { TodoListReadModel } from '@family-planning/domain';

@Injectable()
export class ListsFacade {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  allLists(): Signal<TodoListReadModel[]> {
    this.store.dispatch(LoadAllLists());
    return this.store.selectSignal(listsFeature.selectAllLists);
  }

  listWithId(id: string): TodoListReadModel {
    const list = this.store.selectSignal(listsFeature.selectListById(id));
    if (!list()) {
      this.store.dispatch(LoadAllListsFromDetailView());
      return NullTodoListReadModel;
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

  markItemAsDone(listId: string, itemId: string): void {
    this.store.dispatch(MarkItemAsDone({ listId, itemId }));
  }

  toggleDisplayCompletedItems(): void {
    this.store.dispatch(ToggleDisplayCompletedItems());
  }

  completedItemsShouldBeDisplayed(): Signal<boolean> {
    return this.store.selectSignal(listsFeature.selectDisplayCompleted);
  }
}
