import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { Store } from '@ngrx/store';
import { listsFeature } from '../state/lists.reducer';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';

@Component({
  selector: "app-todo-list-detail",
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoListItemComponent],
  templateUrl: "./todo-list-detail.component.html",
  styleUrl: "./todo-list-detail.component.scss",
})
export class TodoListDetailComponent {
  private store = inject(Store);
  id = input<string>('');
  list = computed(() => {
    const selectedSignal = this.store.selectSignal(listsFeature.selectListById(this.id()));
    return selectedSignal();
  });
  items = computed(() => this.list()?.items);
}
