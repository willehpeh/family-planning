import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldingComponent } from '../../../layout/scaffolding/scaffolding.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewTodoListItemComponent } from './new-todo-list-item/new-todo-list-item.component';
import { ItemDetails } from '@family-planning/application';
import { ListsFacade } from '../../state/lists.facade';

@Component({
  selector: "app-todo-list-detail",
  standalone: true,
  imports: [CommonModule, ScaffoldingComponent, TodoListItemComponent, NewTodoListItemComponent],
  templateUrl: "./todo-list-detail.component.html",
  styleUrl: "./todo-list-detail.component.scss",
})
export class TodoListDetailComponent {
  private readonly listsFacade = inject(ListsFacade);
  id = input<string>('');
  list = computed(() => this.listsFacade.listWithId(this.id()));
  loading = this.listsFacade.loading();
  loadingAndListEmpty = computed(() => this.loading() && !this.list());
  items = computed(() => this.list()?.items);
  newItemButtonTabIndex = computed(() => (this.items()?.length || 0) + 1);
  protected readonly faPlus = faPlus;

  onCreateItem(itemDetails: ItemDetails): void {
    this.listsFacade.addItemToList(this.id(), itemDetails);
  }

  onMarkItemAsDone(itemId: string) {
    this.listsFacade.markItemAsDone(this.id(), itemId);
  }
}
