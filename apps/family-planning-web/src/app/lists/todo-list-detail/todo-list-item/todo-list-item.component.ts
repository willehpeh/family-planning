import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListItem } from '../../models/todo-list-item';

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.scss",
})
export class TodoListItemComponent {
  item = input.required<TodoListItem>();
  itemName = computed(() => this.item().name);
}
