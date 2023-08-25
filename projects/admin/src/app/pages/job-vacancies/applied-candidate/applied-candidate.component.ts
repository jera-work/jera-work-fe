import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppliedVacancyCandidateDetailsResDto } from '@dto/applied-vacancy/applied-vacancy-candidate-details.res.dto';
import { ProgressStatusResDto } from '@dto/data-master/progress-status.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { MasterDataService } from '@services/master-data.service';
import { MenuItem } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'applied-candidate',
  templateUrl: './applied-candidate.component.html',
})
export class AppliedCandidateComponent implements OnInit {
  jobVacancyId?: string;
  progressStatus: MenuItem[] | undefined;

  progressStatusRes: ProgressStatusResDto[] = [];
  appliedVacancyCandidateDetails?: AppliedVacancyCandidateDetailsResDto;

  activeIndex: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appliedVacancyService: AppliedVacancyService,
    private masterDataService: MasterDataService
  ) {}

  getData() {
    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const appliedId = res.get('appliedId');
      const jobVacancyIdParam = res.get('id');
      if (appliedId && jobVacancyIdParam) {
        firstValueFrom(
          this.appliedVacancyService.getAppliedCandidateDetails(appliedId)
        ).then((res) => {
          this.appliedVacancyCandidateDetails = res;
          console.log(this.appliedVacancyCandidateDetails);
        });
        this.jobVacancyId = jobVacancyIdParam;
      }
    });

    firstValueFrom(this.masterDataService.getProgressStatus()).then((res) => {
      this.progressStatus = [];
      for (let progress of res) {
        const menuItem: MenuItem = {
          label: progress.progressName,
        };
        this.progressStatus.push(menuItem);
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
