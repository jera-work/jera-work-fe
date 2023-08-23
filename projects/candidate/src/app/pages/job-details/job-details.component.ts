import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { VacancyDescriptionResDto } from '@dto/vacancy-desc/vacancy-description.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { AuthService } from '@services/auth.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { VacancyDescriptionService } from '@services/vacancy-description.service';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
})
export class JobDetailsComponent implements OnInit {

  jobDetail?: JobVacancyResDto
  jobDesc?: VacancyDescriptionResDto
  jobId!: string
  applyJobModalVisibility = false

  constructor(private fb: NonNullableFormBuilder, 
    private title: Title,
    private jobVacancyService: JobVacancyService,
    private vacancyDesc: VacancyDescriptionService,
    private appliedVacancyService: AppliedVacancyService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.title.setTitle('Job Title');
    this.getDetail()
  }

  AppliedVacancyInsertReqDto = this.fb.group({
    jobVacancyId: '',
    candidateEmail: '',
    jobVacancyCode: '',
    candidateId: ''
  })

  getDetail(){
    this.activatedRoute.params.subscribe(params => {
      this.jobId = params['id']
      this.jobVacancyService.detailCandidate(params['id']).subscribe(result => {
        this.jobDetail = result
      })
    })
  }

  showApplyModal() {
    this.applyJobModalVisibility = true
  }

  applyJob() {
    const data = this.AppliedVacancyInsertReqDto.getRawValue()
    data.jobVacancyId = this.jobId
    this.appliedVacancyService.insertApplied(data).subscribe(result=> {

    })
  }

  test = this.fb.group({
    text: '',
  });
}
