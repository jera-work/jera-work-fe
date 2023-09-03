import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import { VacancyDescriptionResDto } from '@dto/vacancy-desc/vacancy-description.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { AuthService } from '@services/auth.service';
import { JobVacancyService } from '@services/job-vacancy.service';
import { ProfileService } from '@services/profile.service';
import { SavedVacancyService } from '@services/saved-vacancy.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.style.css'],
  providers: [MessageService],
})
export class JobDetailsComponent implements OnInit {
  jobDetail?: JobVacancyResDto;
  jobDesc?: VacancyDescriptionResDto;
  companyPhotoId?: string;
  jobId!: string;
  savedJobId?: string;
  isSaved?: boolean;
  isLogin?: boolean;
  applyJobModalVisibility = false;
  loading = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private title: Title,
    private jobVacancyService: JobVacancyService,
    private savedVacancyService: SavedVacancyService,
    private appliedVacancyService: AppliedVacancyService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Job Title');
    this.getDetail();

    const auth = this.authService.getProfile();
    if (auth) {
      this.getByJobAndCandidate();
      this.isLogin = true;
    }
  }

  AppliedVacancyInsertReqDto = this.fb.group({
    jobVacancyId: '',
    candidateEmail: '',
    jobVacancyCode: '',
    candidateId: '',
  });

  InsertSavedJobReqDto = this.fb.group({
    jobVacancyId: '',
  });

  getDetail() {
    this.activatedRoute.params.subscribe((params) => {
      this.jobId = params['id'];

      this.jobVacancyService
        .detailCandidate(params['id'])
        .subscribe((result) => {
          result.salary = Number(result.salary).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          });
          this.companyPhotoId = result.companyPhotoId;
          this.jobDetail = result;
        });
    });
  }

  showApplyModal() {
    this.applyJobModalVisibility = true;
  }

  async applyJob() {
    const isEducations = await firstValueFrom(
      this.profileService.getEducations()
    ).then((res) => (res.length > 0 ? true : false));
    const isExperiences = await firstValueFrom(
      this.profileService.getExperiences()
    ).then((res) => (res.length > 0 ? true : false));
    const isDocuments = await firstValueFrom(
      this.profileService.getDocuments()
    ).then((res) => (res.length > 0 ? true : false));

    if (isEducations && isExperiences && isDocuments) {
      this.loading = true;
      const data = this.AppliedVacancyInsertReqDto.getRawValue();
      data.jobVacancyId = this.jobId;
      this.applyJobModalVisibility = false;
      firstValueFrom(this.appliedVacancyService.insertApplied(data)).then(
        (res) => {
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        }
      );
    } else {
      this.loading = false;
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        key: 'update',
        summary: 'Warn',
        detail: 'Please complete your profile data!',
      });
    }
  }

  getByJobAndCandidate() {
    this.savedVacancyService
      .getByJobAndCandidate(this.jobId)
      .subscribe((result) => {
        if (result != null) {
          this.savedJobId = result.id;
          this.isSaved = true;
        } else {
          this.isSaved = false;
        }
      });
  }

  saveJob() {
    const data = this.InsertSavedJobReqDto.getRawValue();
    data.jobVacancyId = this.jobId;
    this.savedVacancyService.insertSavedJob(data).subscribe((result) => {
      this.savedJobId = result.id;
      this.isSaved = true;
    });
  }

  deleteSaved() {
    this.savedVacancyService
      .deleteSavedJobs(this.savedJobId!)
      .subscribe((result) => {
        this.isSaved = false;
      });
  }

  changeSavedStatus() {
    if (!this.isSaved) {
      this.saveJob();
    } else {
      this.deleteSaved();
    }
  }
}
