import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Roles } from '@constant/role.constant';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { AuthService } from '@services/auth.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { ReportService } from '@services/report.service';
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
  selector: 'job-vacancy-list',
  templateUrl: './job-vacancy-list.component.html',
  styleUrls: ['./job-vacancy-list.component.css'],
})
export class JobVacancyListComponent implements OnInit {
  visible = false;

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  isAdmin = false;

  jobVacancies: JobVacancyResDto[] = [];

  reportModal = false;
  reportLoading = false;

  reportReqDto = this.fb.group({
    reportDate: ['', Validators.required],
    reportDateTemp: ['', Validators.required],
  });

  ngOnInit(): void {
    this.title.setTitle('Vacancy Job List');

    firstValueFrom(this.jobVacancyService.getAllJobsByCompany()).then((res) => {
      this.jobVacancies = res;
    });

    const profile = this.authService.getProfile();
    if (profile.roleCode === Roles.ADMIN) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  constructor(
    private jobVacancyService: JobVacancyService,
    private authService: AuthService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private reportService: ReportService
  ) {}

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

  convertReportDate(e: any) {
    this.reportReqDto.patchValue({
      reportDate: convertUTCToLocalDateTime(e),
    });
  }

  onCloseReportModal() {
    this.reportModal = false;
  }

  onCreateReport() {
    if (this.reportReqDto.valid) {
      this.reportLoading = true;
      const data = this.reportReqDto.getRawValue().reportDate;

      firstValueFrom(this.reportService.getJobVacancy(data)).then((res) => {
        this.reportLoading = false;
        this.reportReqDto.reset();
        this.reportModal = false;
      });
    } else {
      console.log('Error');
    }
  }
}
