import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerializedTodoList } from '../../models/serialized-todo-list';
import { ScaffoldingComponent } from '../../../layout/scaffolding/scaffolding.component';
import { CardComponent } from '../../../ui-elements/card/card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListsFacade } from '../../state/lists.facade';

@Component({
  selector: 'app-todo-lists-list',
  standalone: true,
  imports: [CommonModule, ScaffoldingComponent, CardComponent, FaIconComponent],
  templateUrl: './todo-lists-list.component.html',
  styleUrl: './todo-lists-list.component.scss',
})
export class TodoListsListComponent {
  private readonly listsFacade = inject(ListsFacade);
  lists: Signal<SerializedTodoList[]> = this.listsFacade.allLists();
  loading = this.listsFacade.loading();
  readonly faPlus = faPlus;
  readonly faListCheck = faListCheck;

  onClickList(id: string) {
    this.listsFacade.openList(id);
  }

  onCreateList() {
    this.listsFacade.createList();
  }
}
