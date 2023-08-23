import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { GenderResDto } from '@dto/data-master/gender.res.dto';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';
import { NationalityResDto } from '@dto/data-master/nationality.res.dto';
import { MaritalStatusResDto } from '@dto/data-master/marital-status.res.dto';
import { BASE_URL } from 'projects/admin/src/app/constant/api.constant';
import { ReligionResDto } from '@dto/data-master/religion.res.dto';
import { MajorsResDto } from '@dto/data-master/majors.res.dto';
import { DegreeResDto } from '@dto/data-master/degree.res.dto';
import { DocumentTypesResDto } from '@dto/data-master/document-types.res.dto';
import { SkillResDto } from '@dto/data-master/skill.res.dto';
import { JobTypeResDto } from '@dto/job-type/job-type.res.dto';
import { CityResDto } from '@dto/city/city.res.dto';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  constructor(private base: BaseService) {}

  getGenders(): Observable<GenderResDto[]> {
    return this.base.get(`${ADMIN_API}/genders`);
  }

  getNationalities(): Observable<NationalityResDto[]> {
    return this.base.get(`${ADMIN_API}/nationalities`);
  }

  getMaritalStatus(): Observable<MaritalStatusResDto[]> {
    return this.base.get(`${ADMIN_API}/maritals`);
  }

  getReligions(): Observable<ReligionResDto[]> {
    return this.base.get(`${ADMIN_API}/religions`);
  }

  getMajors(): Observable<MajorsResDto[]> {
    return this.base.get(`${ADMIN_API}/majors`);
  }

  getDegree(): Observable<DegreeResDto[]> {
    return this.base.get(`${ADMIN_API}/degrees`);
  }

  getDocumentTypes(): Observable<DocumentTypesResDto[]> {
    return this.base.get(`${ADMIN_API}/document-types`);
  }

  getSkills(): Observable<SkillResDto[]> {
    return this.base.get(`${ADMIN_API}/master-skills`);
  }

  getJobTypes(): Observable<JobTypeResDto[]> {
    return this.base.get(`${ADMIN_API}/job-types`);
  }

  getCities(): Observable<CityResDto[]> {
    return this.base.get(`${ADMIN_API}/cities`);
  }

  getDegrees(): Observable<DegreeResDto[]> {
    return this.base.get(`${ADMIN_API}/degrees`);
  }
}
