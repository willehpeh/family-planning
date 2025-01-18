import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListsFacade } from '../../state/lists.facade';
import { TodoListGridCellComponent } from '../todo-list-grid-cell/todo-list-grid-cell.component';
import { TodoListReadModel } from '@family-planning/domain';
import { NavFacade } from '../../../layout/state/nav.facade';

@Component({
  selector: 'app-todo-lists-list',
  standalone: true,
  imports: [CommonModule, TodoListGridCellComponent],
  templateUrl: './todo-lists-list.component.html',
  styleUrl: './todo-lists-list.component.scss',
})
export class TodoListsListComponent implements OnInit, OnDestroy {
  private listsFacade = inject(ListsFacade);
  private navFacade = inject(NavFacade);
  lists: Signal<TodoListReadModel[]> = this.listsFacade.allLists();
  loading = this.listsFacade.loading();
  readonly faPlus = faPlus;

  ngOnInit() {
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
