import { Component, OnInit } from '@angular/core';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { JobVacancyService } from '@services/job-vacancy.service';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'job-vacancy-list',
  templateUrl: './job-vacancy-list.component.html',
})
export class JobVacancyListComponent implements OnInit {
  visible = false;

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  jobVacancies: JobVacancyResDto[] = [];
  jobVacancy?: JobVacancyResDto;

  ngOnInit(): void {
    firstValueFrom(this.jobVacancyService.getAllJobsByCompany(0, 10)).then(
      (res) => {
        console.log(res);
        this.jobVacancies = res;
      }
    );
  }

  constructor(private jobVacancyService: JobVacancyService) {}

  getStatusSeverity(status: string) {
    switch (status) {
      case 'Open':
        return 'success';
      case 'Close':
        return 'danger';
      default:
        return 'danger';
    }
  }
}
