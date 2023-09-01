import { Component, OnInit } from '@angular/core';
import { Roles } from '@constant/role.constant';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { AuthService } from '@services/auth.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';

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

  ngOnInit(): void {
    firstValueFrom(this.jobVacancyService.getAllJobsByCompany()).then(
      (res) => {
        this.jobVacancies = res;
      }
    );

    const profile = this.authService.getProfile();
    if (profile.roleCode === Roles.ADMIN) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  constructor(
    private jobVacancyService: JobVacancyService,
    private authService: AuthService
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
}
