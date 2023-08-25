import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AppliedVacancyAdminResDto,
  AppliedVacancyResDto,
} from '@dto/applied-vacancy/applied-vacancy.res.dto';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'detail',
  templateUrl: './job-vacancy-detail.component.html',
  styleUrls: ['./job-vacancy-detail.component.css'],
})
export class JobVacancyDetailComponent implements OnInit {
  jobVacancy!: JobVacancyResDto;
  loading = false;
  appliedVacancies: AppliedVacancyAdminResDto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobVacancyService: JobVacancyService,
    private appliedVacancyService: AppliedVacancyService
  ) {}

  getData() {
    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const id = res.get('id');
      if (id) {
        firstValueFrom(this.jobVacancyService.getJobDetails(id)).then((res) => {
          this.jobVacancy = res;
          console.log(res);
        });

        firstValueFrom(
          this.appliedVacancyService.getAppliedCandidatesByJobId(id)
        ).then((res) => {
          this.appliedVacancies = res;
        });
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getProgressSeverity(status: string) {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Close':
        return 'danger';
      default:
        return 'danger';
    }
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'Application':
        return 'warning';
      case 'Close':
        return 'danger';
      default:
        return 'danger';
    }
  }
}
