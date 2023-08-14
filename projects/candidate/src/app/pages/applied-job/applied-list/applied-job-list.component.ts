import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'applied-job-list',
  templateUrl: './applied-job-list.component.html',
})
export class AppliedJobListComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Applied Jobs');
  }
}
