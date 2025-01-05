import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerializedTodoListItem } from '../../../models/serialized-todo-list-item';
import { CheckboxComponent } from '../../../../ui-elements/checkbox/checkbox.component';

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.scss",
})
export class TodoListItemComponent {
  item = input.required<SerializedTodoListItem>();
  itemName = computed(() => this.item().name);
  itemDone = computed(() => this.item().done);
  tabIndex = input.required<number>();

  itemMarkedAsDone = output<string>();
  doneItemMarkedAsPending = output<string>();

  onMarkItemAsDone(): void {
    return this.itemDone() ?
      this.doneItemMarkedAsPending.emit(this.item().id) :
      this.itemMarkedAsDone.emit(this.item().id);
  }
}
