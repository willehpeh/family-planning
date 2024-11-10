import { Component, computed, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../layout/header/header.component';
import { Store } from '@ngrx/store';
import { listsFeature } from '../../state/lists.reducer';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewTodoListItemComponent } from './new-todo-list-item/new-todo-list-item.component';
import { ItemDetails } from '@family-planning/application';
import { AddItemToList, LoadAllListsFromDetailView } from '../../state/lists.actions';
import { SerializedTodoListItemFactory } from '../../models/factories/serialized-todo-list-item.factory';

@Component({
  selector: "app-todo-list-detail",
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoListItemComponent, FaIconComponent, NewTodoListItemComponent],
  templateUrl: "./todo-list-detail.component.html",
  styleUrl: "./todo-list-detail.component.scss",
})
export class TodoListDetailComponent implements OnInit {
  private store = inject(Store);
  id = input<string>('');
  list = computed(() => {
    const id = this.id();
    const selectedSignal = this.store.selectSignal(listsFeature.selectListById(id));
    return selectedSignal();
  });
  loading = this.store.selectSignal(listsFeature.selectLoading);
  loadingAndListEmpty = computed(() => this.loading() && !this.list());
  items = computed(() => this.list()?.items);
  newItemButtonTabIndex = computed(() => (this.items()?.length || 0) + 1);
  protected readonly faPlus = faPlus;

  ngOnInit(): void {
    if (!this.list()) {
      this.store.dispatch(LoadAllListsFromDetailView());
    }
  }

  onCreateItem(itemDetails: ItemDetails): void {
    this.store.dispatch(AddItemToList({
      listId: this.id(),
      temporaryItem: SerializedTodoListItemFactory.temporaryItem(itemDetails)
    }));
  }
}
