import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppliedVacancyResDto } from '@dto/applied-vacancy/applied-vacancy.res.dto';
import { JobSearchResDto } from '@dto/job-vacancy/job-search.res.dto';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { JobVacancyService } from '@services/job-vacancy.service';

@Component({
  selector: 'applied-job-list',
  templateUrl: './applied-job-list.component.html',
})
export class AppliedJobListComponent implements OnInit {

  appliedVacancy: AppliedVacancyResDto[] = []

  constructor(private title: Title,
    private appliedVacancyService: AppliedVacancyService) {}

  ngOnInit(): void {
    this.title.setTitle('Applied Jobs');
    this.getMyApplied()
  }

  getMyApplied() {
    this.appliedVacancyService.getAppliedVacancy().subscribe(result => {
      this.appliedVacancy = result
    })
  }

  getSeverity(status: string): string {
    if (status === 'Application') {
      return 'success';
    } else {
      return 'danger';
    }
  }
}
