import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldingComponent } from '../../../layout/scaffolding/scaffolding.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewTodoListItemComponent } from './new-todo-list-item/new-todo-list-item.component';
import { ItemDetails } from '@family-planning/application';
import { ListsFacade } from '../../state/lists.facade';

@Component({
  selector: 'app-todo-list-detail',
  standalone: true,
  imports: [CommonModule, ScaffoldingComponent, TodoListItemComponent, NewTodoListItemComponent],
  templateUrl: './todo-list-detail.component.html',
  styleUrl: './todo-list-detail.component.scss',
})
export class TodoListDetailComponent {
  id = input.required<string>();
  protected readonly faPlus = faPlus;
  private readonly listsFacade = inject(ListsFacade);
  private list = computed(() => this.listsFacade.listWithId(this.id()));
  listName = computed(() => this.list().name);
  loadingAndListEmpty = computed(() => this.listsFacade.loading() && !this.list().id);
  items = computed(() => this.list().items ?? []);
  newItemButtonTabIndex = computed(() => (this.items().length || 0) + 1);

  onCreateItem(itemDetails: ItemDetails): void {
    this.listsFacade.addItemToList(this.id(), itemDetails);
  }

  onMarkItemAsDone(itemId: string) {
    this.listsFacade.markItemAsDone(this.id(), itemId);
  }
}
