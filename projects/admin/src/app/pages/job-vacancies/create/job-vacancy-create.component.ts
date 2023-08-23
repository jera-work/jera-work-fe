import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Roles } from "@constant/role.constant";
import { AgeVacancyResDto } from "@dto/age-vacancy/age-vacancy.res.dto";
import { AvailableStatusResDto } from "@dto/available-status/available-status.res.dto";
import { CityResDto } from "@dto/city/city.res.dto";
import { CompanyResDto } from "@dto/company/company.res.dto";
import { DegreeResDto } from "@dto/data-master/degree.res.dto";
import { GenderResDto } from "@dto/data-master/gender.res.dto";
import { ExperienceLevelResDto } from "@dto/experience-level/experience-level.res.dto";
import { JobTypeResDto } from "@dto/job-type/job-type.res.dto";
import { UserResDto } from "@dto/user/user.res.dto";
import { JobVacancyService } from "@services/job-vacancy.service";
import { UsersService } from "@services/users.service";
import { firstValueFrom } from "rxjs";

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
    selector : 'job-vacancy-create',
    templateUrl : './job-vacancy-create.component.html'
})
export class JobVacancyCreateComponent implements OnInit{

    picUser : UserResDto[] = [];
    picHr : UserResDto[] = [];
    expLevel : ExperienceLevelResDto[] = [];
    availableStatus : AvailableStatusResDto[] = [];
    companies : CompanyResDto[] = [];
    degree : DegreeResDto[] = [];
    gender : GenderResDto[] = [];
    ageVacancy : AgeVacancyResDto[] = [];
    jobType : JobTypeResDto[] = [];
    city : CityResDto[] = [];

    constructor(private fb : NonNullableFormBuilder,
        private jobService: JobVacancyService,
        private userService: UsersService) 
    {}

    jobVacancyInsertReqDto = this.fb.group({
        vacancyCode : ['', [Validators.required, Validators.maxLength(8)]],
        vacancyTitle : ['', [Validators.required, Validators.maxLength(36)]],
        picUserId : ['', Validators.required],
        picHrId : ['', Validators.required],
        startDate : ['', Validators.required],
        startDateTemp : [],
        endDate : ['', Validators.required],
        endDateTemp : [],
        expLevelId : ['', Validators.required],
        availableStatusId : ['', Validators.required],

        degreeId : ['', Validators.required],
        genderId : ['', Validators.required],
        ageVacancyId : ['', Validators.required],
        jobTypeId : ['', Validators.required],
        salary : ['', Validators.required],
        cityId : ['', Validators.required],
        address : ['', Validators.required],
        description : ['', Validators.required]
    })

    ngOnInit(): void {
        firstValueFrom(this.userService.getUsers('ADM'))
        .then((res) => {
            this.picHr = res
            this.picUser = res
            console.log(res)
        })
    }

    convertStartDate(event : any){
        const convertedDate = convertUTCToLocalDateTime(event)
        this.jobVacancyInsertReqDto.patchValue({
            startDate : convertedDate,
        })
    }

    convertEndDate(event : any){
        const convertedDate = convertUTCToLocalDateTime(event)
        this.jobVacancyInsertReqDto.patchValue({
            endDate : convertedDate,
        })
    }

    submit(){
        firstValueFrom(this.jobService.insertJob(this.jobVacancyInsertReqDto.getRawValue()))
        .then((res) => {
            console.log(res.id)
            console.log(res.message);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}