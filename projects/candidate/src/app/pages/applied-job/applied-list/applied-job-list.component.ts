import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
    private appliedVacancyService: AppliedVacancyService,
    private router: Router) {}

  ngOnInit(): void {
    this.title.setTitle('Applied Jobs');
    this.getMyApplied()
  }

  getMyApplied() {
    this.appliedVacancyService.getAppliedVacancy().subscribe(result => {
      this.appliedVacancy = result
    })
  }

  toDetail(appliedId: string){
    this.router.navigateByUrl(`/applied-job/${appliedId}`)
  }

  getSeverity(status: string): string {
    if (status === 'Application') {
      return 'success';
    } else {
      return 'danger';
    }
  }
}
