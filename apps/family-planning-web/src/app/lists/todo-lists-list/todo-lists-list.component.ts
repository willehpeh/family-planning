import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LoadAllLists } from '../state/lists.actions';
import { listsFeature } from '../state/lists.reducer';
import { SerializedTodoList } from '../models/serialized-todo-list';
import { HeaderComponent } from '../../layout/header/header.component';
import { CardComponent } from '../../ui-elements/card/card.component';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faListCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-lists-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardComponent, FaIconComponent],
  templateUrl: './todo-lists-list.component.html',
  styleUrl: './todo-lists-list.component.scss',
})
export class TodoListsListComponent implements OnInit {
  store = inject(Store);
  lists: Signal<SerializedTodoList[]> = this.store.selectSignal(listsFeature.selectAllLists);
  readonly faPlus = faPlus;
  readonly faListCheck = faListCheck;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(LoadAllLists());
  }

  onClickList(id: string) {
    this.router.navigate(['/lists/todo', id]);
  }

  onCreateList() {
    this.router.navigate(['/lists/todo/new']);
  }
}
