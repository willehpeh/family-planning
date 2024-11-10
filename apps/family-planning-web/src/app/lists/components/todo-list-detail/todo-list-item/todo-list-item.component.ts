import { Component, computed, input } from '@angular/core';
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

  tabIndex = input.required<number>();
}
