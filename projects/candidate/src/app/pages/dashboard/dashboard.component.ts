import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CityResDto } from '@dto/city/city.res.dto';
import { DegreeResDto } from '@dto/data-master/degree.res.dto';
import { JobTypeResDto } from '@dto/job-type/job-type.res.dto';
import { JobSearchResDto } from '@dto/job-vacancy/job-search.res.dto';
import { JobVacancyService } from '@services/job-vacancy.service';
import { MasterDataService } from '@services/master-data.service';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewChecked {
  fullName: string = '';

  latestJobs: JobSearchResDto[] = [];
  allJobs: JobSearchResDto[] = [];
  jobs: JobSearchResDto[] = [];
  jobTypes: JobTypeResDto[] = [];
  cities: CityResDto[] = [];
  degrees: DegreeResDto[] = [];
  jobType?: string

  first: number = 0;
  rowCounts: number = 10;
  length!: number;

  constructor(
    private title: Title,
    private jobVacancyService: JobVacancyService,
    private masterService: MasterDataService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  searchReq = this.fb.group({
    vacancyTitle: '',
    degreeId: '',
    cityId: '',
    jobTypeId: '',
  });

  ngOnInit(): void {
    this.title.setTitle('Jera - Work');
    this.getLatestJob();
    this.getPagination(this.first, this.rowCounts);
    this.getAll();
    this.getMasterData();
  }

  searchJobs() {
    const data = this.searchReq.getRawValue();
    this.jobVacancyService
      .searchCandidate(
        this.first,
        this.rowCounts,
        data.vacancyTitle,
        data.degreeId,
        data.cityId,
        data.jobTypeId
      )
      .subscribe((result) => {
        this.allJobs = result;
        this.length = result.length;
      });
  }

  getAll() {
    this.jobVacancyService.getAllJobsCandidate().subscribe((result) => {
      this.jobs = result;
      this.length = result.length;
    });
  }

  getPagination(startIndex: number, endIndex: number) {
    this.jobVacancyService
      .getAllJobsWithPaginationCandidate(startIndex, endIndex)
      .subscribe((result) => {
        this.allJobs = result;
        this.length = this.jobs.length;
      });
  }

  getLatestJob() {
    this.jobVacancyService
      .getLatestJobCandidate(0, this.rowCounts)
      .subscribe((result) => {
        this.latestJobs = result;
      });
  }

  getMasterData() {
    this.masterService.getJobTypes().subscribe((result) => {
      this.jobTypes = result;
    });

    this.masterService.getCities().subscribe((result) => {
      this.cities = result;
    });

    this.masterService.getDegree().subscribe((result) => {
      this.degrees = result;
    });
  }

  onPageChange(event: any) {
    console.log(event.first);
    console.log(event.rows);
    console.log(event.first + event.rows);
    
    this.getPagination(event.first, this.rowCounts);
  }

  toDetail(jobId: string) {
    this.router.navigateByUrl(`/job/${jobId}`);
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

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
