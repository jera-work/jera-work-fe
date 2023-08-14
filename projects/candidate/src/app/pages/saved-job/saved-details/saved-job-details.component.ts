import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'saved-job-details',
  templateUrl: './saved-job-details.component.html',
})
export class SavedJobDetailsComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Job Title');
  }
}
