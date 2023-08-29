import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressStatus } from '@constant/progress.constant';
import { Status } from '@constant/status.constant';
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
  jobVacancyId?: string;
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
        this.jobVacancyId = id;
      }

      if (this.jobVacancyId) {
        firstValueFrom(
          this.jobVacancyService.getJobDetails(this.jobVacancyId)
        ).then((res) => {
          this.jobVacancy = res;
          console.log(res);
        });

        firstValueFrom(
          this.appliedVacancyService.getAppliedCandidatesByJobId(
            this.jobVacancyId
          )
        ).then((res) => {
          this.appliedVacancies = res;
        });
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getProgressColor(progress: string): string {
    if (progress === ProgressStatus.APPLICATION) {
      return 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)';
    } else if (
      progress === ProgressStatus.ASSESSMENT ||
      progress === ProgressStatus.INTERVIEW_USER
    ) {
      return 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)';
    } else if (progress === ProgressStatus.MCU) {
      return 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
    } else if (progress === ProgressStatus.OFFERING_LETTER) {
      return 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)';
    } else {
      return 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)';
    }
  }

  getStatusColor(status: string): string {
    if (status === Status.ACT) {
      return 'linear-gradient(212deg, #10B940 0%, #ede947 100%)';
    } else if (status === Status.CLS) {
      return 'linear-gradient(90deg, #272724 0%, #4a4a4a 100%)';
    } else {
      return 'linear-gradient(135deg, #0c32bb 14%, #FF0000 100%)';
    }
  }
}
