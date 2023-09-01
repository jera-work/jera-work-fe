import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'job-vacancy-create',
  templateUrl: './job-vacancy-create.component.html',
})
export class JobVacancyCreateComponent implements OnInit {
  picUser: UserResDto[] = [];
  picHr: UserResDto[] = [];
  expLevel: ExperienceLevelResDto[] = [];
  companies: CompanyResDto[] = [];
  degrees: DegreeResDto[] = [];
  genders: GenderResDto[] = [];
  ageVacancy: AgeVacancyResDto[] = [];
  jobType: JobTypeResDto[] = [];
  cities: CityResDto[] = [];

  loading = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private jobService: JobVacancyService,
    private userService: UsersService,
    private masterDataService: MasterDataService,
    private router: Router
  ) {}

  jobVacancyInsertReqDto = this.fb.group({
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
  });

  getData() {
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
  }

  ngOnInit(): void {
    this.getData();
  }

  convertStartDate(event: any) {
    const convertedDate = convertUTCToLocalDateTime(event);
    this.jobVacancyInsertReqDto.patchValue({
      startDate: convertedDate,
    });
  }

  convertEndDate(event: any) {
    const convertedDate = convertUTCToLocalDateTime(event);
    this.jobVacancyInsertReqDto.patchValue({
      endDate: convertedDate,
    });
  }

  onSubmit() {
    if (this.jobVacancyInsertReqDto.valid) {
      this.loading = true;
      firstValueFrom(
        this.jobService.insertJob(this.jobVacancyInsertReqDto.getRawValue())
      )
        .then((res) => {
          this.loading = false;
          this.router.navigateByUrl('/job-vacancies');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Please input value!');
    }
  }
}
