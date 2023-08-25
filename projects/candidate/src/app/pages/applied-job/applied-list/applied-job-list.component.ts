import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppliedVacancyResDto } from '@dto/applied-vacancy/applied-vacancy.res.dto';
import { JobSearchResDto } from '@dto/job-vacancy/job-search.res.dto';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'applied-job-list',
  templateUrl: './applied-job-list.component.html',
})
export class AppliedJobListComponent implements OnInit {

  appliedVacancy: AppliedVacancyResDto[] = []
  appliedVacancyWithLimit: AppliedVacancyResDto[] = []
  first: number = 0;
  rowCounts: number = 3;
  length!: number;

  constructor(private title: Title,
    private appliedVacancyService: AppliedVacancyService,
    private router: Router) {}

  ngOnInit(): void {
    this.title.setTitle('Applied Jobs');
    this.getMyApplied()
    this.getMyAppliedWithLimit(this.first, this.rowCounts)
  }

  getMyApplied() {
    this.appliedVacancyService.getAppliedVacancy().subscribe(result => {
      this.appliedVacancy = result
      this.length = result.length
    })
  }

  getMyAppliedWithLimit(startIndex: number, endIndex: number) {
    firstValueFrom(this.appliedVacancyService.getAppliedVacancyWithLimit(startIndex,endIndex)).then(result => {
      this.appliedVacancyWithLimit = result
    })
  }
  onPageChange(event: any) {
    this.getMyAppliedWithLimit(event.first, event.first + event.rows);
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
