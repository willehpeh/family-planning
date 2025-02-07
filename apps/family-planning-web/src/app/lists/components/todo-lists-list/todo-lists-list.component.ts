import { Component, inject, OnDestroy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListsFacade } from '../../state/lists.facade';
import { TodoListGridCellComponent } from '../todo-list-grid-cell/todo-list-grid-cell.component';
import { NavFacade } from '../../../layout/state/nav.facade';
import { TodoList } from '../../models/todo-list';

@Component({
    selector: 'app-todo-lists-list',
    imports: [CommonModule, TodoListGridCellComponent],
    templateUrl: './todo-lists-list.component.html',
    styleUrl: './todo-lists-list.component.scss'
})
export class TodoListsListComponent implements OnDestroy {
  private listsFacade = inject(ListsFacade);
  private navFacade = inject(NavFacade);
  lists: Signal<TodoList[]> = this.listsFacade.allLists();
  loading = this.listsFacade.loading();
  readonly faPlus = faPlus;

  constructor() {
    this.navFacade.setBackButtonPath('command-centre');
  }

  onClickList(id: string) {
    this.listsFacade.openList(id);
  }

  onCreateList() {
    this.listsFacade.goToCreateList();
  }

  ngOnDestroy(): void {
    this.navFacade.clearBackButton();
  }
}
