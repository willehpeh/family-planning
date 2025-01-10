import { Component, computed, inject, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { NewTodoListItemComponent } from './new-todo-list-item/new-todo-list-item.component';
import { ItemDetails } from '@family-planning/application';
import { ListsFacade } from '../../state/lists.facade';
import { CheckboxComponent } from '../../../ui-elements/checkbox/checkbox.component';
import { TodoListItemReadModel } from '@family-planning/domain';

@Component({
  selector: 'app-todo-list-detail',
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, NewTodoListItemComponent, CheckboxComponent],
  templateUrl: './todo-list-detail.component.html',
  styleUrl: './todo-list-detail.component.scss',
})
export class TodoListDetailComponent {
  id = input.required<string>();
  private readonly listsFacade = inject(ListsFacade);
  protected readonly showCompletedItems = this.listsFacade.completedItemsShouldBeDisplayed();
  private list = computed(() => this.listsFacade.listWithId(this.id()));
  protected readonly listName = computed(() => this.list().name);
  protected readonly loadingAndListEmpty = computed(() => this.listsFacade.loading() && !this.list().id);
  private readonly items = computed(() => this.list().items ?? []);
  protected readonly pendingItems = this._pendingItems();
  protected readonly doneItems = this._doneItems();
  protected readonly newItemButtonTabIndex = computed(() => (this.items().length || 0) + 1);

  private _pendingItems(): Signal<TodoListItemReadModel[]> {
    return computed(() => this.items().filter((item) => !item.done).reverse());
  }

  private _doneItems(): Signal<TodoListItemReadModel[]> {
    return computed(() => this.items().filter((item) => item.done).reverse());
  }

  onCreateItem(itemDetails: ItemDetails): void {
    this.listsFacade.addItemToList(this.id(), itemDetails);
  }

  onMarkItemAsDone(itemId: string) {
    this.listsFacade.markItemAsDone(this.id(), itemId);
  }

  onMarkDoneItemAsPending(itemId: string) {
    this.listsFacade.markDoneItemAsPending(this.id(), itemId);
  }

  onToggleDisplayCompletedItems() {
    this.listsFacade.toggleDisplayCompletedItems();
  }
}
