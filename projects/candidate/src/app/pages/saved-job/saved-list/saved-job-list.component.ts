import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'saved-job-list',
  templateUrl: './saved-job-list.component.html',
})
export class SavedJobListComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Saved Jobs');
  }
}
