import { Component, ElementRef, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressStatus } from '@constant/progress.constant';
import { Roles } from '@constant/role.constant';
import { AvailableStatusName, Status } from '@constant/status.constant';
import { AppliedVacancyByProgressAdminResDto } from '@dto/applied-vacancy/applied-vacancy-by-progress-admin.res.dto';
import {
  AppliedVacancyAdminResDto,
  AppliedVacancyResDto,
} from '@dto/applied-vacancy/applied-vacancy.res.dto';
import { AppliedProgressResDto } from '@dto/data-master/applied-progress.res.dto';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { AuthService } from '@services/auth.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { MasterDataService } from '@services/master-data.service';
import { ReportService } from '@services/report.service';
import { Dialog } from 'primeng/dialog';
import { firstValueFrom } from 'rxjs';

const convertUTCToLocalDateTime = function (date: Date) {
  const newDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
  return newDate.toISOString();
};

@Component({
  selector: 'detail',
  templateUrl: './job-vacancy-detail.component.html',
  styleUrls: ['./job-vacancy-detail.component.css'],
})
export class JobVacancyDetailComponent implements OnInit {
  jobVacancy!: JobVacancyResDto;
  jobVacancyId?: string;
  loading = false;
  previewModalVisibility = false;
  appliedVacancies: AppliedVacancyAdminResDto[] = [];
  appliedProgress: AppliedProgressResDto[] = [];
  appliedVacancyPerProgressQty: AppliedVacancyByProgressAdminResDto[] = [];
  isAdmin = false;
  isHr = false;

  // report
  reportModal = false;
  reportLoading = false;
  reportReqDto = this.fb.group({
    jobId: ['', Validators.required],
    date: ['', Validators.required],
    dateTemp: ['', Validators.required],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private jobVacancyService: JobVacancyService,
    private appliedVacancyService: AppliedVacancyService,
    private masterDataService: MasterDataService,
    private reportService: ReportService,
    private router: Router,
    private title: Title,
    private fb: NonNullableFormBuilder
  ) {}

  getData() {
    const data = this.authService.getProfile();
    const userRole = data['roleCode'];
    if (userRole === Roles.ADMIN) {
      this.isAdmin = true;
      this.isHr = false;
    } else if (userRole === Roles.HR) {
      this.isHr = true;
      this.isAdmin = false;
    }

    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const id = res.get('id');
      if (id) {
        this.jobVacancyId = id;
        this.getProgressQty();
      }

      if (this.jobVacancyId) {
        firstValueFrom(
          this.jobVacancyService.getJobDetails(this.jobVacancyId)
        ).then((res) => {
          this.jobVacancy = res;
          this.title.setTitle(`${res.companyName} - ${res.vacancyTitle}`);
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
    this.getProgressName();
  }

  showPreviewModal(dialog: Dialog) {
    this.previewModalVisibility = true;
    dialog.maximized = true;
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
    } else if (progress === ProgressStatus.HIRED) {
      return 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)';
    } else {
      return 'linear-gradient(90deg, hsla(206, 91%, 66%, 1) 0%, hsla(190, 90%, 51%, 1) 100%)';
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

  getProgressName() {
    firstValueFrom(this.masterDataService.getProgressStatus()).then((res) => {
      this.appliedProgress = res;
    });
  }

  getAppliedByProgressId(progressId: string) {
    firstValueFrom(
      this.appliedVacancyService.getAppliedVacancyByProgress(
        progressId,
        this.jobVacancyId!
      )
    ).then((res) => {
      this.appliedVacancies = res;
    });
  }

  toEdit() {
    this.router.navigateByUrl(`/job-vacancies/${this.jobVacancyId}/edit`);
  }

  getProgressQty() {
    firstValueFrom(
      this.appliedVacancyService.getProgressCount(this.jobVacancyId!)
    ).then((res) => {
      this.appliedVacancyPerProgressQty = res;
    });
  }

  getAvailableStatus(): boolean {
    return this.jobVacancy.statusName === AvailableStatusName.OPN;
  }

  // Report
  convertReportDate(e: any) {
    this.reportReqDto.patchValue({
      date: convertUTCToLocalDateTime(e),
    });
  }

  onShowReportModal() {
    this.reportModal = true;
    this.reportReqDto.patchValue({
      jobId: this.jobVacancyId,
    });
    console.log(this.reportReqDto.getRawValue());
  }

  onCloseReportModal() {
    this.reportModal = false;
    this.reportReqDto.reset();
  }

  onCreateReport() {
    if (this.reportReqDto.valid) {
      this.reportLoading = true;
      const { date, jobId } = this.reportReqDto.getRawValue();

      firstValueFrom(this.reportService.getAppliedCandidate(jobId, date)).then(
        (res) => {
          this.reportLoading = false;
          this.reportModal = false;
          this.reportReqDto.reset();
        }
      );
    } else {
      console.log('Error');
    }
  }
}
