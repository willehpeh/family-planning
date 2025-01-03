import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerializedTodoListItem } from '../../../models/serialized-todo-list-item';

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.scss",
})
export class TodoListItemComponent {
  item = input.required<SerializedTodoListItem>();
  itemName = computed(() => this.item().name);
  itemDone = computed(() => this.item().done);
  tabIndex = input.required<number>();

  itemMarkedAsDone = output<string>();

  onMarkItemAsDone(): void {
    if (this.itemDone()) {
      return;
    }
    this.itemMarkedAsDone.emit(this.item().id);
  }
}
