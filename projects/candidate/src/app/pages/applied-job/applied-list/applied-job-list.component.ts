import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppliedVacancyResDto } from '@dto/applied-vacancy/applied-vacancy.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { firstValueFrom } from 'rxjs';
import { ProgressCode } from '../../../constant/progress.constant';
import { StatusCode } from '../../../constant/status.constant';

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

  getProgressColor(progress: string): string {
    if (progress === ProgressCode.APP) {
      return 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)';
    } else if (progress === ProgressCode.ASS|| progress === ProgressCode.INT){
      return 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)';
    } else if (progress === ProgressCode.MCU){
      return 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
    } else if (progress === ProgressCode.OFL){      
      return 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)';
    } else {
      return 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)';
    }
  }
  
  getStatusColor(status: string): string {
    if(status === StatusCode.ACT) {
      return 'linear-gradient(212deg, #10B940 0%, #ede947 100%)'
    } else if (status === StatusCode.CLS) {
      return 'linear-gradient(90deg, #272724 0%, #4a4a4a 100%)'
    } else {
      return 'linear-gradient(135deg, #0c32bb 14%, #FF0000 100%)'
    }
  }
}
