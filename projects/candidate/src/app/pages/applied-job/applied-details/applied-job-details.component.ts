import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'applied-job-details',
  templateUrl: './applied-job-details.component.html',
  styleUrls: ['./applied-job-details.component.css'],
})
export class AppliedJobDetailsComponent implements OnInit {
  jobStatus: MenuItem[] = [
    {
      label: 'Application',
    },
    {
      label: 'Assesment',
    },
    {
      label: 'Interview User',
    },
    {
      label: 'MCU / Medical Check Up',
    },
    {
      label: 'Offering Letter',
    },
    {
      label: 'Hired',
    },
  ];

  activeIndex: number = 0;

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Job Title');
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
}
