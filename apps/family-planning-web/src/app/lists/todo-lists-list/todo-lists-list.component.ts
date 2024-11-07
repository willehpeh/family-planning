import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Store } from '@ngrx/store';
import { LoadAllLists } from '../state/lists.actions';
import { listsFeature } from '../state/lists.reducer';
import { TodoList } from '../models/todo-list';
import { HeaderComponent } from '../../layout/header/header.component';
import { CardComponent } from '../../ui-elements/card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-todo-lists-list",
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardComponent],
  templateUrl: "./todo-lists-list.component.html",
  styleUrl: "./todo-lists-list.component.scss",
})
export class TodoListsListComponent implements OnInit {
  store = inject(Store);
  lists: Signal<TodoList[]> = this.store.selectSignal(listsFeature.selectAllLists);

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(LoadAllLists());
  }

  onClickList(id: string) {
    this.router.navigate(['/lists/todo', id]);
  }
}
