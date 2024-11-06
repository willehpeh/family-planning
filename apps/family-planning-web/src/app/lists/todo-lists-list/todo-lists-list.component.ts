import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Store } from '@ngrx/store';
import { LoadAllLists } from '../state/lists.actions';
import { listsFeature } from '../state/lists.reducer';
import { TodoList } from '../models/todo-list';

@Component({
  selector: "app-todo-lists-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./todo-lists-list.component.html",
  styleUrl: "./todo-lists-list.component.scss",
})
export class TodoListsListComponent implements OnInit {
  store = inject(Store);
  lists: Signal<TodoList[]> = this.store.selectSignal(listsFeature.selectAllLists);

  ngOnInit() {
    this.store.dispatch(LoadAllLists());
  }
}
