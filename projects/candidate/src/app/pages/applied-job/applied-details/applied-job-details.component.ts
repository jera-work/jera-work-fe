import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppliedVacancyProgressResDto } from '@dto/applied-vacancy/applied-vacancy-progress.res.dto';
import { AppliedProgressResDto } from '@dto/data-master/applied-progress.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { MasterDataService } from '@services/master-data.service';
import { MenuItem } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ProgressStatus } from '../../../constant/progress.constant';
import { JobVacancyService } from '@services/job-vacancy.service';

@Component({
  selector: 'applied-job-details',
  templateUrl: './applied-job-details.component.html',
  styleUrls: ['./applied-job-details.component.css'],
})
export class AppliedJobDetailsComponent implements OnInit {
  jobStatus: MenuItem[] = [];
  progress?: AppliedVacancyProgressResDto;

  activeIndex: number = 0;
  appliedId?: string;

  constructor(private title: Title,
    private masterDataService: MasterDataService,
    private appliedVacancyService: AppliedVacancyService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.title.setTitle('Job Title');
    this.getAppliedProgress()
    this.getPogress()
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  getAppliedProgress() {
    firstValueFrom(this.masterDataService.getAppliedProgress()).then(result => {
      for (let r of result) {
        const menuItem: MenuItem = {
          label: r.progressName
        }

        this.jobStatus.push(menuItem)
      }
    })
  }

  getPogress() {
    this.activatedRoute.params.subscribe(params => {
      this.appliedId = params['id']
      firstValueFrom(this.appliedVacancyService.getProgress(this.appliedId!)).then(result => {
        if (result.progressCode === ProgressStatus.APP) {
          this.activeIndex = 0
        } else if (result.progressCode === ProgressStatus.ASS) {
          this.activeIndex = 1
        } else if (result.progressCode === ProgressStatus.HIR) {
          this.activeIndex = 2
        } else if (result.progressCode === ProgressStatus.INT) {
          this.activeIndex = 3
        } else if (result.progressCode === ProgressStatus.MCU) {
          this.activeIndex = 4
        } else if (result.progressCode === ProgressStatus.OFL) {
          this.activeIndex = 5
        }
      })
    })
  }
}
