import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss',
})
export class DependentsListEditComponent {
  @Input({ required: true }) userForm!: FormGroup;
  @Output('onRemovelDependent') onRemoveDependentEmit = new EventEmitter<number>();
  @Output('onAddDependent') onAddDependentEmit = new EventEmitter<void>();

  get dependentesList(): FormArray {
    return this.userForm.get('dependentesList') as FormArray;[];
  }

  onRemoveButton(dependentIndex: number) {
    this.onRemoveDependentEmit.emit(dependentIndex);
  }

  onAddDependent() {
    this.onAddDependentEmit.emit();
  }
}
