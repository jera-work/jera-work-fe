import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JobSearchResDto } from '@dto/job-vacancy/job-search.res.dto';
import { JobVacancyService } from '@services/job-vacancy.service';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  fullName: string = '';

  ingredient!: string;
  latestJobs: JobSearchResDto[] = []
  allJobs: JobSearchResDto[] = []
  jobs: JobSearchResDto[] = []

  first: number = 0
  rowCounts: number = 10
  length?: number

  constructor(private title: Title, private jobVacancyService: JobVacancyService) {}

  ngOnInit(): void {
    this.title.setTitle('Jera - Work');
    this.getLatestJob()
    this.getPagination()
    this.getAll()
  }
  
  getAll() {
    this.jobVacancyService.getAllJobs().subscribe(result => {
      this.jobs = result
      this.length = result.length
    })
    
  }

  getPagination() {
    this.jobVacancyService.getAllJobsWithPagination(this.first, this.rowCounts).subscribe(result => {
      this.allJobs = result
    })
  }

  getLatestJob() {
    this.jobVacancyService.getLatestJob(0, this.rowCounts).subscribe(result => {
      this.latestJobs = result
    })
  }

  onPageChange(event: any){
    let pageIndex = event.first/event.rows + 1
    this.length = this.jobs.length
    
    event.first = this.rowCounts
    event.rows += 10
    this.jobVacancyService.getAllJobsWithPagination(event.first, event.rows).subscribe(result => {
      this.allJobs = result
    })
  }

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return '';
  }
}
