import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { SavedJobResDto } from '@dto/saved-vacancy/saved-vacancy-res.dto';
import { VacancyDescriptionResDto } from '@dto/vacancy-desc/vacancy-description.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { AuthService } from '@services/auth.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { SavedVacancyService } from '@services/saved-vacancy.service';
import { VacancyDescriptionService } from '@services/vacancy-description.service';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
})
export class JobDetailsComponent implements OnInit {

  jobDetail?: JobVacancyResDto
  jobDesc?: VacancyDescriptionResDto
  jobId!: string
  savedJobId?: string
  isSaved?: boolean
  applyJobModalVisibility = false

  constructor(private fb: NonNullableFormBuilder, 
    private title: Title,
    private jobVacancyService: JobVacancyService,
    private savedVacancyService: SavedVacancyService,
    private appliedVacancyService: AppliedVacancyService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.title.setTitle('Job Title');
    this.getDetail()
    this.getByJobAndCandidate()
  }

  AppliedVacancyInsertReqDto = this.fb.group({
    jobVacancyId: '',
    candidateEmail: '',
    jobVacancyCode: '',
    candidateId: ''
  })

  InsertSavedJobReqDto = this.fb.group({
    jobVacancyId: ''
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

  getByJobAndCandidate(){
    this.savedVacancyService.getByJobAndCandidate(this.jobId).subscribe(result=> {
      if(result != null){
        this.savedJobId = result.id
        this.isSaved = true
      } else {
        this.isSaved = false
      }
    })
  }

  saveJob(){
    const data = this.InsertSavedJobReqDto.getRawValue()
    data.jobVacancyId = this.jobId
    this.savedVacancyService.insertSavedJob(data).subscribe(result => {
      this.savedJobId = result.id
      this.isSaved = true
    })
  }

  deleteSaved(){
    this.savedVacancyService.deleteSavedJobs(this.savedJobId!).subscribe(result => {
      this.isSaved = false
    })
  }

  changeSavedStatus(){
    if (!this.isSaved) {
      this.saveJob()
    } else {
      this.deleteSaved()
    }
  }

  test = this.fb.group({
    text: '',
  });
}
