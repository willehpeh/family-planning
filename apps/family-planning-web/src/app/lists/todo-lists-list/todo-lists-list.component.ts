import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Store } from '@ngrx/store';
import { LoadAllLists } from '../state/lists.actions';

@Component({
  selector: "app-todo-lists-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./todo-lists-list.component.html",
  styleUrl: "./todo-lists-list.component.scss",
})
export class TodoListsListComponent implements OnInit {
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(LoadAllLists());
  }
}
