import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppliedVacancyProgressResDto } from '@dto/applied-vacancy/applied-vacancy-progress.res.dto';
import { AppliedProgressResDto } from '@dto/data-master/applied-progress.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { MasterDataService } from '@services/master-data.service';
import { MenuItem } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ProgressStatus } from '@constant/progress.constant';
import { JobVacancyService } from '@services/job-vacancy.service';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { ProgressAppliedJobVacancyService } from '@services/progress-applied-job-vacancy.service';

@Component({
  selector: 'applied-job-details',
  templateUrl: './applied-job-details.component.html',
  styleUrls: ['./applied-job-details.component.css'],
})
export class AppliedJobDetailsComponent implements OnInit {
  jobStatus: MenuItem[] = [];
  progress?: AppliedVacancyProgressResDto;
  jobVacancy?: JobVacancyResDto;
  offeringDataId?: string;

  activeIndex: number = 0;
  appliedId?: string;
  modalApproveOffering = false;
  isApprove = false;

  constructor(
    private title: Title,
    private masterDataService: MasterDataService,
    private appliedVacancyService: AppliedVacancyService,
    private jobVacancyService: JobVacancyService,
    private activatedRoute: ActivatedRoute,
    private progressAppliedJobService: ProgressAppliedJobVacancyService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Job Title');
    this.getAppliedProgress();

    this.getProgress();
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  getAppliedProgress() {
    firstValueFrom(this.masterDataService.getProgressStatus()).then(
      (result) => {
        for (let r of result) {
          const menuItem: MenuItem = {
            label: r.progressName,
          };
          this.jobStatus.push(menuItem);
        }
        console.log(this.jobStatus);
      }
    );
  }

  getProgress() {
    this.activatedRoute.params.subscribe((params) => {
      this.appliedId = params['id'];

      if (this.appliedId) {
        firstValueFrom(
          this.appliedVacancyService.getProgress(this.appliedId!)
        ).then((result) => {
          if (result.progressCode === ProgressStatus.APPLICATION) {
            this.activeIndex = 0;
          } else if (result.progressCode === ProgressStatus.ASSESSMENT) {
            this.activeIndex = 1;
          } else if (result.progressCode === ProgressStatus.INTERVIEW_USER) {
            this.activeIndex = 2;
          } else if (result.progressCode === ProgressStatus.MCU) {
            this.activeIndex = 3;
          } else if (result.progressCode === ProgressStatus.OFFERING_LETTER) {
            this.activeIndex = 4;
          } else if (result.progressCode === ProgressStatus.HIRED) {
            this.activeIndex = 5;
          }
          firstValueFrom(
            this.jobVacancyService.detailCandidate(result.jobVacancyId)
          ).then((result) => {
            this.jobVacancy = result;
          });
          firstValueFrom(
            this.progressAppliedJobService.getOffering(
              result.appliedVacancyFromAdminId
            )
          ).then((res) => {
            if (res) {
              this.isApprove = res.approve;
              this.offeringDataId = res.offeringId;
            }
          });
        });
      }
    });
  }

  submitApproveOffering() {
    if (this.offeringDataId) {
      firstValueFrom(
        this.progressAppliedJobService.updateOfferingFromCandidate(
          this.offeringDataId
        )
      ).then((res) => {
        console.log(res);
        this.modalApproveOffering = false;
      });
    } else {
      console.log('error');
    }
  }
}
