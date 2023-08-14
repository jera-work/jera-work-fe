import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'applied-job-details',
  templateUrl: './applied-job-details.component.html',
  styleUrls: ['./applied-job-details.component.css'],
})
export class AppliedJobDetailsComponent {
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

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
}
