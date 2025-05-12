import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-container',
  templateUrl: './buttons-container.component.html',
  styleUrl: './buttons-container.component.scss',
})
export class ButtonsContainerComponent {
  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) isValidForm: boolean = false;

  @Output('onEditButton') onEditButtonEmit = new EventEmitter<void>();
  @Output('onCandelButton') onCandelButtonEmit = new EventEmitter<void>();
  @Output('onSaveButton') onSaveButtonEmit = new EventEmitter<void>();

  onEditButton() {
    this.onEditButtonEmit.emit();
  }

  onCandelButton() {
    this.onCandelButtonEmit.emit();
  }

  onSaveButton() {
    this.onSaveButtonEmit.emit();
  }
}
