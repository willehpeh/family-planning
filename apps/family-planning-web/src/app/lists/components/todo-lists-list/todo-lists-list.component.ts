import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListsFacade } from '../../state/lists.facade';
import { TodoListGridCellComponent } from '../todo-list-grid-cell/todo-list-grid-cell.component';
import { TodoListReadModel } from '@family-planning/domain';

@Component({
  selector: 'app-todo-lists-list',
  standalone: true,
  imports: [CommonModule, TodoListGridCellComponent],
  templateUrl: './todo-lists-list.component.html',
  styleUrl: './todo-lists-list.component.scss',
})
export class TodoListsListComponent {
  private readonly listsFacade = inject(ListsFacade);
  lists: Signal<TodoListReadModel[]> = this.listsFacade.allLists();
  loading = this.listsFacade.loading();
  readonly faPlus = faPlus;

  onClickList(id: string) {
    this.listsFacade.openList(id);
  }

  onCreateList() {
    this.listsFacade.createList();
  }
}
