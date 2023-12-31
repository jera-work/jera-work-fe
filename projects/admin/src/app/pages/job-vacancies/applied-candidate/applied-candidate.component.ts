import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppliedVacancyCandidateDetailsResDto } from '@dto/applied-vacancy/applied-vacancy-candidate-details.res.dto';
import { ProgressStatusResDto } from '@dto/data-master/progress-status.res.dto';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { MasterDataService } from '@services/master-data.service';
import { ProgressAppliedJobVacancyService } from '@services/progress-applied-job-vacancy.service';
import { MenuItem } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ProgressStatus } from '@constant/progress.constant';
import { ColorPickerChangeEvent } from 'primeng/colorpicker';
import { AssessmentVacancyResDto } from '@dto/progress-job-vacancy/assessment-vacancy.res.dto';
import { InterviewVacancyResDto } from '@dto/progress-job-vacancy/interview-vacancy.res.dto';
import { McuVacancyResDto } from '@dto/progress-job-vacancy/mcu-vacancy.res.dto';
import { OfferingResDto } from '@dto/progress-job-vacancy/offering.res.dto';
import { HiringVacancyResDto } from '@dto/progress-job-vacancy/hiring-vacancy.res.dto';
import { AuthService } from '@services/auth.service';
import { ADMIN_API } from '@constant/api.constant';
import { Status } from '@constant/status.constant';

const convertUTCToLocalDateTime = function (date: Date) {
  const newDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
  return newDate.toISOString();
};

@Component({
  selector: 'applied-candidate',
  templateUrl: './applied-candidate.component.html',
  styleUrls: ['applied-candidate.styles.css'],
})
export class AppliedCandidateComponent implements OnInit, AfterViewChecked {
  jobVacancyId?: string;
  progressStatus: MenuItem[] | undefined;
  progressStatusDropdown: any[] = [];
  selectedProgress?: string;
  photoProfile?: string;
  appliedModal = false;
  assessmentModal = false;
  interviewModal = false;
  mcuModal = false;
  offeringModal = false;
  hiredModal = false;
  rejectModal = false;
  updateModalAssessment = false;
  updateModalInterview = false;
  isHr = false;
  isUser = false;

  stateOptions: any[] = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  progressStatusRes: ProgressStatusResDto[] = [];
  appliedVacancyCandidateDetails?: AppliedVacancyCandidateDetailsResDto;

  toggleUpdateAssessment = false;
  toggleUpdateInterview = false;

  rejectStatusReqDto = this.fb.group({
    appliedVacancyId: ['', Validators.required],
    appliedStatusId: ['', Validators.required],
  });

  // progress data res
  assessmentVacancyResDto?: AssessmentVacancyResDto;
  interviewVacancyResDto?: InterviewVacancyResDto;
  mcuVacancyResDto?: McuVacancyResDto;
  offeringResDto?: OfferingResDto;
  hiringResDto?: HiringVacancyResDto;

  activeIndex: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appliedVacancyService: AppliedVacancyService,
    private masterDataService: MasterDataService,
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private progressAppliedJobVacancyService: ProgressAppliedJobVacancyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getProgressStatusData();
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  getLatestProgressStatus() {
    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const appliedId = res.get('appliedId');
      const jobVacancyIdParam = res.get('id');
      if (appliedId && jobVacancyIdParam) {
        firstValueFrom(
          this.appliedVacancyService.getAppliedCandidateDetails(appliedId)
        ).then((res) => {
          this.appliedVacancyCandidateDetails = res;
          if (res.appliedProgressCode === ProgressStatus.APPLICATION) {
            this.activeIndex = 0;
          } else if (res.appliedProgressCode === ProgressStatus.ASSESSMENT) {
            this.activeIndex = 1;
          } else if (
            res.appliedProgressCode === ProgressStatus.INTERVIEW_USER
          ) {
            this.activeIndex = 2;
          } else if (res.appliedProgressCode === ProgressStatus.MCU) {
            this.activeIndex = 3;
          } else if (
            res.appliedProgressCode === ProgressStatus.OFFERING_LETTER
          ) {
            this.activeIndex = 4;
          } else if (res.appliedProgressCode === ProgressStatus.HIRED) {
            this.activeIndex = 5;
          }
        });
        this.jobVacancyId = jobVacancyIdParam;
      }
    });
  }

  getData() {
    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const appliedId = res.get('appliedId');
      const jobVacancyIdParam = res.get('id');
      if (appliedId && jobVacancyIdParam) {
        firstValueFrom(
          this.appliedVacancyService.getAppliedCandidateDetails(appliedId)
        ).then((res) => {
          const loginData = this.authService.getProfile();
          res.expectedSalary = Number(res.expectedSalary).toLocaleString(
            'id-ID',
            {
              style: 'currency',
              currency: 'IDR',
            }
          );
          this.appliedVacancyCandidateDetails = res;

          if (res.photoId) {
            this.photoProfile = `${ADMIN_API}/files/${res.photoId}`;
          } else {
            this.photoProfile = '/assets/default.png';
          }

          if (res.appliedProgressCode === ProgressStatus.APPLICATION) {
            this.activeIndex = 0;
          } else if (res.appliedProgressCode === ProgressStatus.ASSESSMENT) {
            this.activeIndex = 1;
          } else if (
            res.appliedProgressCode === ProgressStatus.INTERVIEW_USER
          ) {
            this.activeIndex = 2;
          } else if (res.appliedProgressCode === ProgressStatus.MCU) {
            this.activeIndex = 3;
          } else if (
            res.appliedProgressCode === ProgressStatus.OFFERING_LETTER
          ) {
            this.activeIndex = 4;
          } else if (res.appliedProgressCode === ProgressStatus.HIRED) {
            this.activeIndex = 5;
          }

          if (loginData['id'] === res.picHrId) {
            this.isHr = true;
          } else {
            this.isHr = false;
          }

          if (loginData['id'] === res.picUserId) {
            this.isUser = true;
          } else {
            this.isUser = false;
          }
        });
        this.jobVacancyId = jobVacancyIdParam;
      }
    });

    firstValueFrom(this.masterDataService.getProgressStatus()).then((res) => {
      this.progressStatus = [];
      this.progressStatusRes = res;

      for (let progress of res) {
        const menuItem: MenuItem = {
          label: progress.progressName,
        };
        this.progressStatus.push(menuItem);
        this.progressStatusDropdown.push({
          name: progress.progressName,
        });
      }
    });
  }

  getProgressStatusData() {
    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const appliedId = res.get('appliedId');
      if (appliedId) {
        // get assessment data
        firstValueFrom(
          this.progressAppliedJobVacancyService.getAssessment(appliedId)
        ).then((res) => {
          if (res) {
            this.updateNotesAssessmentReqDto.patchValue({
              notes: res.notes ? res.notes : '',
            });
            this.assessmentVacancyResDto = res;
          }
        });

        // get interview user data
        firstValueFrom(
          this.progressAppliedJobVacancyService.getInterviewUser(appliedId)
        ).then((res) => {
          if (res) {
            this.updateNotesInterviewReqDto.patchValue({
              notes: res.notes ? res.notes : '',
            });
            this.interviewVacancyResDto = res;
          }
        });

        // get mcu data
        firstValueFrom(
          this.progressAppliedJobVacancyService.getMcu(appliedId)
        ).then((res) => {
          this.mcuVacancyResDto = res;
        });

        // get offering data
        firstValueFrom(
          this.progressAppliedJobVacancyService.getOffering(appliedId)
        ).then((res) => {
          this.offeringResDto = res;
        });

        // get hired
        firstValueFrom(
          this.appliedVacancyService.getAppliedCandidateDetails(appliedId)
        ).then((res) => {
          firstValueFrom(
            this.progressAppliedJobVacancyService.getHired(res.candidateId)
          ).then((res) => {
            this.hiringResDto = res;
          });
        });
      }
    });
  }

  appliedVacancyUpdateProgressReqDto = this.fb.group({
    appliedVacancyId: ['', [Validators.required]],
    appliedProgressId: ['', [Validators.required]],
  });

  assessmentVacancyInsertReqDto = this.fb.group({
    appliedVacancyId: ['', [Validators.required]],
    isQuestion: [false, [Validators.required]],
    notes: [''],
    score: [0],
    startDate: ['', [Validators.required]],
    startDateTemp: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endDateTemp: ['', [Validators.required]],
    assessmentLocation: ['', [Validators.required]],
  });

  interviewVacancyInsertReqDto = this.fb.group({
    appliedVacancyId: ['', [Validators.required]],
    notes: [''],
    startDate: ['', Validators.required],
    startDateTemp: ['', Validators.required],
    endDate: ['', Validators.required],
    endDateTemp: ['', Validators.required],
    interviewLocation: ['', Validators.required],
  });

  mcuVacancyInsertReqDto = this.fb.group({
    appliedVacancyId: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endDateTemp: ['', [Validators.required]],
  });

  offeringInsertReqDto = this.fb.group({
    appliedVacancyId: ['', [Validators.required]],
    isApprove: [false],
    startDate: ['', [Validators.required]],
    startDateTemp: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endDateTemp: ['', [Validators.required]],
    description: ['description', [Validators.required]],
    offeringLocation: ['', [Validators.required]],

    companyDescription: ['', [Validators.required]],
    companyDescriptionFontColor: ['', [Validators.required]],
    companyNameFontColor: ['', [Validators.required]],
    startWork: ['', [Validators.required]],
    startWorkTemp: ['', [Validators.required]],
  });

  hiringVacancyInsertReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
  });

  updateNotesAssessmentReqDto = this.fb.group({
    progressId: ['', [Validators.required]],
    notes: ['', [Validators.required]],
  });

  updateNotesInterviewReqDto = this.fb.group({
    progressId: ['', [Validators.required]],
    notes: ['', [Validators.required]],
  });

  onCompanyColorChange(event: ColorPickerChangeEvent) {
    this.offeringInsertReqDto.patchValue({
      companyNameFontColor: event.value as string,
    });
  }

  onCompanyColorInputChange(event: any) {
    this.offeringInsertReqDto.patchValue({
      companyNameFontColor: event.target.value,
    });
  }

  onCompanyDescColorChange(event: ColorPickerChangeEvent) {
    this.offeringInsertReqDto.patchValue({
      companyDescriptionFontColor: event.value as string,
    });
  }

  onCompanyDescColorInputChange(event: any) {
    this.offeringInsertReqDto.patchValue({
      companyDescriptionFontColor: event.target.value,
    });
  }

  convertStartDate(event: any, data: any) {
    const convertedDate = convertUTCToLocalDateTime(event);
    const { name } = data;

    if (name === this.progressStatusRes[0].progressName) {
      this.assessmentVacancyInsertReqDto.patchValue({
        startDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[1].progressName) {
      this.assessmentVacancyInsertReqDto.patchValue({
        startDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[2].progressName) {
      this.interviewVacancyInsertReqDto.patchValue({
        startDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[3].progressName) {
      this.mcuVacancyInsertReqDto.patchValue({
        startDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[4].progressName) {
      this.offeringInsertReqDto.patchValue({
        startDate: convertedDate,
      });
    }
  }

  convertEndDate(event: any, data: any) {
    const convertedDate = convertUTCToLocalDateTime(event);
    const { name } = data;

    if (name === this.progressStatusRes[0].progressName) {
      this.assessmentVacancyInsertReqDto.patchValue({
        endDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[1].progressName) {
      this.assessmentVacancyInsertReqDto.patchValue({
        endDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[2].progressName) {
      this.interviewVacancyInsertReqDto.patchValue({
        endDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[3].progressName) {
      this.mcuVacancyInsertReqDto.patchValue({
        endDate: convertedDate,
      });
    }
    if (name === this.progressStatusRes[4].progressName) {
      this.offeringInsertReqDto.patchValue({
        endDate: convertedDate,
      });
    }
  }

  convertStartWorkDate(event: any) {
    const convertedDate = convertUTCToLocalDateTime(event);
    this.offeringInsertReqDto.patchValue({
      startWork: convertedDate,
    });
  }

  showDialog(event: any) {
    const { name } = event;
    const getStatusData = (name: any) =>
      this.progressStatusRes.find((res) => res.progressName === name);
    const appliedVacancyId = this.appliedVacancyCandidateDetails?.id;

    if (name === this.progressStatusDropdown[0].name) {
      this.appliedModal = true;
    }
    if (name === this.progressStatusDropdown[1].name) {
      this.assessmentModal = true;
      const dataStatus = getStatusData(name);
      this.assessmentVacancyInsertReqDto.patchValue({
        appliedVacancyId: appliedVacancyId,
      });
      this.appliedVacancyUpdateProgressReqDto.patchValue({
        appliedProgressId: dataStatus?.id,
        appliedVacancyId: appliedVacancyId,
      });
    }
    if (name === this.progressStatusDropdown[2].name) {
      this.interviewModal = true;
      const dataStatus = getStatusData(name);

      this.interviewVacancyInsertReqDto.patchValue({
        appliedVacancyId: appliedVacancyId,
      });
      this.appliedVacancyUpdateProgressReqDto.patchValue({
        appliedProgressId: dataStatus?.id,
        appliedVacancyId: appliedVacancyId,
      });
    }
    if (name === this.progressStatusDropdown[3].name) {
      this.mcuModal = true;
      const dataStatus = getStatusData(name);

      this.mcuVacancyInsertReqDto.patchValue({
        appliedVacancyId: appliedVacancyId,
      });

      this.appliedVacancyUpdateProgressReqDto.patchValue({
        appliedProgressId: dataStatus?.id,
        appliedVacancyId: appliedVacancyId,
      });
    }
    if (name === this.progressStatusDropdown[4].name) {
      this.offeringModal = true;

      const dataStatus = getStatusData(name);

      this.offeringInsertReqDto.patchValue({
        appliedVacancyId,
      });

      this.appliedVacancyUpdateProgressReqDto.patchValue({
        appliedProgressId: dataStatus?.id,
        appliedVacancyId,
      });
    }
    if (name === this.progressStatusDropdown[5].name) {
      const dataStatus = getStatusData(name);
      this.hiredModal = true;
      const candidateId = this.appliedVacancyCandidateDetails?.candidateId;
      this.hiringVacancyInsertReqDto.patchValue({
        candidateId,
      });

      this.appliedVacancyUpdateProgressReqDto.patchValue({
        appliedProgressId: dataStatus?.id,
        appliedVacancyId,
      });
    }
  }

  showDialogUpdateAssessment(progressId: string) {
    this.updateModalAssessment = true;
    this.updateNotesAssessmentReqDto.patchValue({
      progressId,
    });
  }

  updateNotesAssessment() {
    if (this.updateNotesAssessmentReqDto.valid) {
      const data = this.updateNotesAssessmentReqDto.getRawValue();
      firstValueFrom(
        this.progressAppliedJobVacancyService.updateNotesAssessment(data)
      ).then((res) => {
        this.getProgressStatusData();
        this.updateNotesAssessmentReqDto.reset();
        this.updateModalAssessment = false;
        this.toggleUpdateAssessment = false;
      });
    } else {
      console.log('please input value');
    }
  }

  showDialogUpdateInterview(progressId: string) {
    this.updateModalInterview = true;
    this.updateNotesInterviewReqDto.patchValue({
      progressId,
    });
  }

  updateNotesInterview() {
    if (this.updateNotesInterviewReqDto.valid) {
      const data = this.updateNotesInterviewReqDto.getRawValue();
      firstValueFrom(
        this.progressAppliedJobVacancyService.updateNotesInterviewUser(data)
      ).then((res) => {
        this.getProgressStatusData();
        this.updateNotesInterviewReqDto.reset();
        this.updateModalInterview = false;
        this.toggleUpdateInterview = false;
      });
    } else {
      console.log('Please input');
    }
  }

  showDialogReject() {
    let rejectId;
    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const appliedId = res.get('appliedId');
      if (appliedId) {
        firstValueFrom(this.appliedVacancyService.getAppliedStatus()).then(
          (res) => {
            rejectId = res.find((s) => s.statusCode === Status.RJC)?.id;

            this.rejectStatusReqDto.patchValue({
              appliedVacancyId: appliedId,
              appliedStatusId: rejectId,
            });
            if (this.rejectStatusReqDto.valid) {
              const data = this.rejectStatusReqDto.getRawValue();
              firstValueFrom(
                this.appliedVacancyService.changeAppliedStatus(data)
              ).then((res) => {
                this.router.navigateByUrl(
                  `/job-vacancies/${this.jobVacancyId}`
                );
              });
            }
          }
        );
      }
    });
  }

  submit(event: any) {
    const { name } = event;
    if (name === this.progressStatusDropdown[0].name) {
      this.appliedModal = !this.appliedModal;
      this.appliedVacancyUpdateProgressReqDto.patchValue({
        appliedVacancyId: '1234',
        appliedProgressId: 'applicationid',
      });
    }
    if (name === this.progressStatusDropdown[1].name) {
      if (
        this.assessmentVacancyInsertReqDto.valid &&
        this.appliedVacancyUpdateProgressReqDto.valid
      ) {
        const insertProgressData =
          this.assessmentVacancyInsertReqDto.getRawValue();
        const updateStatus =
          this.appliedVacancyUpdateProgressReqDto.getRawValue();

        firstValueFrom(
          this.progressAppliedJobVacancyService.insertAssessment(
            insertProgressData
          )
        ).then((res) => {
          this.getProgressStatusData();
        });
        firstValueFrom(
          this.progressAppliedJobVacancyService.updateAppliedVacancyDetailStatus(
            updateStatus
          )
        ).then((res) => {
          this.getLatestProgressStatus();
        });
        this.assessmentModal = false;
      }
    }

    if (name === this.progressStatusDropdown[2].name) {
      if (
        this.interviewVacancyInsertReqDto.valid &&
        this.appliedVacancyUpdateProgressReqDto.valid
      ) {
        const insertProgressData =
          this.interviewVacancyInsertReqDto.getRawValue();
        const updateStatus =
          this.appliedVacancyUpdateProgressReqDto.getRawValue();

        firstValueFrom(
          this.progressAppliedJobVacancyService.insertInterviewUser(
            insertProgressData
          )
        ).then((res) => {
          this.getProgressStatusData();
        });
        firstValueFrom(
          this.progressAppliedJobVacancyService.updateAppliedVacancyDetailStatus(
            updateStatus
          )
        ).then((res) => {
          this.getLatestProgressStatus();
        });
        this.interviewModal = false;
      } else {
        console.log('error tetot');
      }
    }

    if (name === this.progressStatusDropdown[3].name) {
      if (
        this.mcuVacancyInsertReqDto.valid &&
        this.appliedVacancyUpdateProgressReqDto.valid
      ) {
        const insertProgressData = this.mcuVacancyInsertReqDto.getRawValue();
        const updateStatus =
          this.appliedVacancyUpdateProgressReqDto.getRawValue();

        firstValueFrom(
          this.progressAppliedJobVacancyService.insertMcu(insertProgressData)
        ).then((res) => {
          this.getProgressStatusData();
        });
        firstValueFrom(
          this.progressAppliedJobVacancyService.updateAppliedVacancyDetailStatus(
            updateStatus
          )
        ).then((res) => {
          this.getLatestProgressStatus();
        });
        this.mcuModal = false;
      } else {
        console.log('please input');
      }
    }
    if (name === this.progressStatusDropdown[4].name) {
      if (
        this.offeringInsertReqDto.valid &&
        this.appliedVacancyUpdateProgressReqDto.valid
      ) {
        const insertProgressData = this.offeringInsertReqDto.getRawValue();
        const updateStatus =
          this.appliedVacancyUpdateProgressReqDto.getRawValue();

        firstValueFrom(
          this.progressAppliedJobVacancyService.insertOffering(
            insertProgressData
          )
        ).then((res) => {
          this.getProgressStatusData();
        });

        firstValueFrom(
          this.progressAppliedJobVacancyService.updateAppliedVacancyDetailStatus(
            updateStatus
          )
        ).then((res) => {
          this.getLatestProgressStatus();
        });
        this.offeringModal = false;
      } else {
        console.log('please input');
      }
      console.log('Offering');
    }
    if (name === this.progressStatusDropdown[5].name) {
      if (
        this.hiringVacancyInsertReqDto.valid &&
        this.appliedVacancyUpdateProgressReqDto.valid
      ) {
        const insertProgressData = this.hiringVacancyInsertReqDto.getRawValue();
        const updateStatus =
          this.appliedVacancyUpdateProgressReqDto.getRawValue();

        firstValueFrom(
          this.progressAppliedJobVacancyService.insertHiring(insertProgressData)
        ).then((res) => {
          this.getProgressStatusData();
        });

        firstValueFrom(
          this.progressAppliedJobVacancyService.updateAppliedVacancyDetailStatus(
            updateStatus
          )
        ).then((res) => {
          this.getLatestProgressStatus();
        });
        this.hiredModal = false;
      }
      console.log('Hired');
    }
  }
}
