import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldingComponent } from '../../../../layout/scaffolding/scaffolding.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../ui-elements/button/button.component';
import { Store } from '@ngrx/store';
import { CreateList } from '../../../state/lists.actions';
import { listsFeature } from '../../../state/lists.reducer';

@Component({
  selector: "app-create-list-form",
  standalone: true,
  imports: [CommonModule, ScaffoldingComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: "./create-list-form.component.html",
  styleUrl: "./create-list-form.component.scss",
})
export class CreateListFormComponent implements OnInit {

  private store = inject(Store);

  newTodoListForm!: FormGroup;
  saving: Signal<boolean> = this.store.selectSignal(listsFeature.selectSaving);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newTodoListForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onCreateNewList() {
    this.store.dispatch(CreateList(this.newTodoListForm.value));
  }
}
