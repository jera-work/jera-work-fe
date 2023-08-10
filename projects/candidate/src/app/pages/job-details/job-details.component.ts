import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
})
export class JobDetailsComponent {
  constructor(private fb: NonNullableFormBuilder) {}

  test = this.fb.group({
    text: '',
  });
}
