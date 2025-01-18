import { ChangeDetectionStrategy, Component, computed, inject, input, OnDestroy, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { NewTodoListItemComponent } from './new-todo-list-item/new-todo-list-item.component';
import { ItemDetails } from '@family-planning/application';
import { ListsFacade } from '../../state/lists.facade';
import { CheckboxComponent } from '../../../ui-elements/checkbox/checkbox.component';
import { TodoListItemReadModel } from '@family-planning/domain';
import { NavFacade } from '../../../layout/state/nav.facade';

@Component({
  selector: 'app-todo-list-detail',
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, NewTodoListItemComponent, CheckboxComponent],
  templateUrl: './todo-list-detail.component.html',
  styleUrl: './todo-list-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListDetailComponent implements OnInit, OnDestroy {
  id = input.required<string>();
  protected pendingItems = this._pendingItems();
  protected doneItems = this._doneItems();
  private listsFacade = inject(ListsFacade);
  protected showCompletedItems = this.listsFacade.completedItemsShouldBeDisplayed();
  private navFacade = inject(NavFacade);
  private list = computed(() => this.listsFacade.listWithId(this.id()));
  protected listName = computed(() => this.list().name);
  protected loadingAndListEmpty = computed(() => this.listsFacade.loading() && !this.list().id);
  private items = computed(() => this.list().items ?? []);
  protected newItemButtonTabIndex = computed(() => (this.items().length || 0) + 1);

  ngOnInit(): void {
    this.navFacade.setBackButtonPath(`lists/todo`);
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

  ngOnDestroy(): void {
    this.navFacade.clearBackButton();
  }

  private _pendingItems(): Signal<TodoListItemReadModel[]> {
    return computed(() => this.items().filter((item) => !item.done).reverse());
  }

  private _doneItems(): Signal<TodoListItemReadModel[]> {
    return computed(() => this.items().filter((item) => item.done).reverse());
  }
}
