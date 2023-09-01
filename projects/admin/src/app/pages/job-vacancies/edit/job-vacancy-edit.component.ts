import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '@constant/role.constant';
import { CityResDto } from '@dto/data-master/city.res.dto';
import { CompanyResDto } from '@dto/company/company.res.dto';
import { AgeVacancyResDto } from '@dto/data-master/age-vacancy.res.dto';
import { DegreeResDto } from '@dto/data-master/degree.res.dto';
import { ExperienceLevelResDto } from '@dto/data-master/experience-level.res.dto';
import { GenderResDto } from '@dto/data-master/gender.res.dto';
import { JobTypeResDto } from '@dto/data-master/job-type.res.dto';
import { UserResDto } from '@dto/user/user.res.dto';
import { JobVacancyService } from '@services/job-vacancy.service';
import { MasterDataService } from '@services/master-data.service';
import { UsersService } from '@services/users.service';
import { firstValueFrom } from 'rxjs';
import { AppliedVacancyService } from '@services/applied-vacancy.service';
import { JobVacancyResDto } from '@dto/job-vacancy/job-vacancy.res.dto';
import * as moment from 'moment';
import { AvailableStatusResDto } from '@dto/available-status/available-status.res.dto';

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
  selector: 'job-vacancy-edit',
  templateUrl: './job-vacancy-edit.component.html',
})
export class JobVacancyEditComponent implements OnInit, AfterViewChecked  {
  jobVacancy!: JobVacancyResDto;
  jobVacancyId?: string;
  loading = false;
  disabled = true;
  previewModalVisibility = false
  picUser: UserResDto[] = [];
  picHr: UserResDto[] = [];
  expLevel: ExperienceLevelResDto[] = [];
  companies: CompanyResDto[] = [];
  degrees: DegreeResDto[] = [];
  genders: GenderResDto[] = [];
  ageVacancy: AgeVacancyResDto[] = [];
  jobType: JobTypeResDto[] = [];
  cities: CityResDto[] = [];
  availableStatuses: AvailableStatusResDto[] = []
  startDateTempAsDate?: Date
  endDateTempAsDate?: Date
  startDateUTCFromDB?: Date
  endDateUTCFromDB?: Date

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobVacancyService: JobVacancyService,
    private userService: UsersService,
    private masterDataService: MasterDataService,
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  getData() {
    firstValueFrom(this.activatedRoute.paramMap).then((res) => {
      const id = res.get('id');
      if (id) {
        this.jobVacancyId = id;
      }

      if (this.jobVacancyId) {
        firstValueFrom(
          this.jobVacancyService.getJobDetails(this.jobVacancyId)
        ).then((res) => {
          this.jobVacancy = res;
          console.log(res);

          this.startDateTempAsDate = moment(res.startDate, "DD-MM-yyyy hh:mm:ss").toDate();
          this.endDateTempAsDate = moment(res.endDate, "DD-MM-yyyy hh:mm:ss").toDate();

          console.log(res.endDate);
          console.log(res.startDate);
          console.log(this.endDateTempAsDate);
          console.log(this.startDateTempAsDate)
          if(res){
            this.jobVacancyUpdateReqDto.patchValue({
              jobVacancyId: this.jobVacancyId,
              vacancyTitle: res.vacancyTitle,
              address: res.address,
              ageVacancyId: res.ageVacancyId,
              cityId: res.cityId,
              degreeId: res.degreeId,
              description: res.description,
              endDate: convertUTCToLocalDateTime(this.endDateTempAsDate),
              expLevelId: res.levelId,
              genderId: res.genderId,
              jobTypeId: res.jobTypeId,
              picHrId: res.hrId,
              picUserId: res.userId,
              salary: res.salary,
              startDate: convertUTCToLocalDateTime(this.startDateTempAsDate),
              vacancyCode: res.vacancyCode,
              availableStatusId: res.statusId
            })
          }
        });
      }
    });
  }

  jobVacancyUpdateReqDto = this.fb.group({
    jobVacancyId: ['', [Validators.required]],
    vacancyCode: ['', [Validators.required, Validators.maxLength(8)]],
    vacancyTitle: ['', [Validators.required, Validators.maxLength(36)]],
    picUserId: ['', Validators.required],
    picHrId: ['', Validators.required],
    startDate: ['', Validators.required],
    startDateTemp: [],
    endDate: ['', Validators.required],
    endDateTemp: [],
    expLevelId: ['', Validators.required],
    degreeId: ['', Validators.required],
    genderId: ['', Validators.required],
    ageVacancyId: ['', Validators.required],
    jobTypeId: ['', Validators.required],
    salary: ['', Validators.required],
    cityId: ['', Validators.required],
    address: ['', Validators.required],
    description: ['', Validators.required],
    availableStatusId: ['', Validators.required]
  });

  convertStartDate(event: any) {
    const convertedDate = convertUTCToLocalDateTime(event);
    this.jobVacancyUpdateReqDto.patchValue({
      startDate: convertedDate,
    });
  }

  convertEndDate(event: any) {
    const convertedDate = convertUTCToLocalDateTime(event);
    this.jobVacancyUpdateReqDto.patchValue({
      endDate: convertedDate,
    });
  }

  ngOnInit(): void {
    this.getData();
    this.getMaster();
  }

  getMaster() {
    firstValueFrom(this.userService.getUsersByRole(Roles.HR)).then((res) => {
      this.picHr = res;
    });

    firstValueFrom(this.userService.getUsersByRole(Roles.USER)).then((res) => {
      this.picUser = res;
    });

    firstValueFrom(this.masterDataService.getGenders()).then((res) => {
      this.genders = res;
    });

    firstValueFrom(this.masterDataService.getDegree()).then(
      (res) => (this.degrees = res)
    );

    firstValueFrom(this.masterDataService.getCities()).then((res) => {
      this.cities = res;
    });

    firstValueFrom(this.masterDataService.getJobTypes()).then((res) => {
      this.jobType = res;
    });

    firstValueFrom(this.masterDataService.getExperiencesLevel()).then((res) => {
      console.log(res);
      this.expLevel = res;
    });

    firstValueFrom(this.masterDataService.getAgeVacancies()).then((res) => {
      console.log(res);
      this.ageVacancy = res;
    });

    firstValueFrom(this.masterDataService.getAvailableStatus()).then((res) => {
      console.log(res);
      this.availableStatuses = res
    });
  }

  saveEdit(){
    this.loading = true
    const data = this.jobVacancyUpdateReqDto.getRawValue()
    firstValueFrom(this.jobVacancyService.editJob(data)).then((res) => {
      console.log(res);
      this.loading = false
    })
    .catch((err) => {
      console.log(err);
      this.loading = false
    });
  }
}
