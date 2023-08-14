import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
})
export class JobDetailsComponent implements OnInit {
  constructor(private fb: NonNullableFormBuilder, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Job Title');
  }

  test = this.fb.group({
    text: '',
  });
}
