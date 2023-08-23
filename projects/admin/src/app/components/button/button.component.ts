import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  template: `
    <p-button
      *ngIf="show"
      type="{{ btnType }}"
      styleClass="{{ classBtn }}"
      (click)="clickBtn()"
      [loading]="loading"
      [label]="label"
    >
    </p-button>
  `,
  imports: [CommonModule, ButtonModule],
  standalone: true,
})
export class ButtonComponent {
  @Input() label = '';
  @Input() classBtn = '';
  @Input() btnType = '';
  @Input() loading = false;
  @Input() show = true;

  @Output() clickChange = new EventEmitter<void>();

  clickBtn() {
    this.clickChange.emit();
  }
}
