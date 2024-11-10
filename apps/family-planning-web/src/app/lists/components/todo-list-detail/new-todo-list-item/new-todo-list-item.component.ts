import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ItemDetails } from '@family-planning/application';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../ui-elements/button/button.component';

@Component({
  selector: "app-new-todo-list-item",
  standalone: true,
  imports: [CommonModule, FaIconComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: "./new-todo-list-item.component.html",
  styleUrl: "./new-todo-list-item.component.scss",
})
export class NewTodoListItemComponent implements OnInit {
  protected readonly faPlus = faPlus;
  tabIndex = input<number>(0);
  itemCreated = output<ItemDetails>();
  editing = signal(false);

  newItemForm!: FormGroup;
  hoverClasses = computed(() => ({
    'cursor-pointer': !this.editing(),
    'hover:border-amber-500': !this.editing(),
    'hover:bg-gray-900': !this.editing()
  }))

  ngOnInit(): void {
    this.newItemForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] })
    });
  }

  onCreateItem(): void {
    this.itemCreated.emit(this.newItemForm.value);
    this.editing.set(false);
    this.newItemForm.reset();
  }

  onStartEditing(event?: KeyboardEvent): void {
    if (event && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    this.editing.set(true);
  }

  onCancelEditing(): void {
    this.editing.set(false);
  }
}
