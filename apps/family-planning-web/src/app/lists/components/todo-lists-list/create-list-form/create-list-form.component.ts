import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../ui-elements/button/button.component';
import { ListsFacade } from '../../../state/lists.facade';

@Component({
    selector: "app-create-list-form",
    imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
    templateUrl: "./create-list-form.component.html",
    styleUrl: "./create-list-form.component.scss"
})
export class CreateListFormComponent implements OnInit {

  private listsFacade = inject(ListsFacade);

  newTodoListForm!: FormGroup;
  saving: Signal<boolean> = this.listsFacade.saving();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newTodoListForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onCreateNewList() {
    this.listsFacade.createList(this.newTodoListForm.value);
  }
}
