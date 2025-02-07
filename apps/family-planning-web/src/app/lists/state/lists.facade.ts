import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NullTodoListReadModel } from '../models/null-todo-list.read-model';
import * as ListActions from './lists.actions';
import { listsFeature } from './lists.reducer';
import { CreateTodoListDto, ItemProperties } from '@family-planning/application';
import { TodoListItemReadModel, TodoListReadModel } from '@family-planning/domain';

@Injectable()
export class ListsFacade {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  private _listsLastLoaded = 0;
  private readonly MAX_LISTS_AGE = 1000 * 60 * 5; // 5 minutes

  allLists(): Signal<TodoListReadModel[]> {
    if (this.listsAreStale()) {
      this.loadLists();
    }
    return this.store.selectSignal(listsFeature.selectAllLists);
  }

  private loadLists() {
    this._listsLastLoaded = Date.now();
    this.store.dispatch(ListActions.LoadAllLists());
  }

  private listsAreStale() {
    return Date.now() - this._listsLastLoaded > this.MAX_LISTS_AGE;
  }

  listWithId(id: string): TodoListReadModel {
    const list = this.store.selectSignal(listsFeature.selectListById(id));
    if (!list()) {
      this.store.dispatch(ListActions.LoadAllListsFromDetailView());
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

  goToCreateList(): void {
    this.router.navigate(['/lists/todo/new']);
  }

  addItemToList(listId: string, properties: ItemProperties): void {
    this.store.dispatch(ListActions.CreateListItem({
      listId,
      temporaryItem: this.temporaryListItem(properties),
    }));
  }

  markItemAsDone(listId: string, itemId: string): void {
    this.store.dispatch(ListActions.MarkItemAsDone({ listId, itemId }));
  }

  markDoneItemAsPending(listId: string, itemId: string): void {
    this.store.dispatch(ListActions.MarkDoneItemAsPending({ listId, itemId }));
  }

  toggleDisplayCompletedItems(): void {
    this.store.dispatch(ListActions.ToggleDisplayCompletedItems());
  }

  completedItemsShouldBeDisplayed(): Signal<boolean> {
    return this.store.selectSignal(listsFeature.selectDisplayCompleted);
  }

  createList(createListDto: CreateTodoListDto): void {
    this.store.dispatch(ListActions.CreateList({ createListDto }));
  }

  saving(): Signal<boolean> {
    return this.store.selectSignal(listsFeature.selectSaving);
  }

  private temporaryListItem({ name }: ItemProperties): TodoListItemReadModel {
    return {
      id: this.dummyItemId(),
      name,
      done: false
    };
  }

  private dummyItemId(): string {
    return Date.now().toString();
  }
}
