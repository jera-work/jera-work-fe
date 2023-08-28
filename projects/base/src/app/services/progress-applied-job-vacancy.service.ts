import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AssessmentVacancyInsertReqDto } from '@dto/progress-job-vacancy/assessment-vacancy-insert.req.dto';
import { InsertResDto } from '@dto/insert.res.dto';
import { Observable } from 'rxjs';
import { ADMIN_API } from '@constant/api.constant';
import { AppliedVacancyUpdateReqDto } from '@dto/applied-vacancy/applied-vacancy-update.req.dto';
import { UpdateResDto } from '@dto/update.res.dto';
import { InterviewVacancyInsertDto } from '@dto/progress-job-vacancy/interview-vacancy-insert.req.dto';
import { McuVacancyInsertReqDto } from '@dto/progress-job-vacancy/mcu-vacancy-insert.req.dto';
import { OfferingInsertReqDto } from '@dto/progress-job-vacancy/offering-insert.req.dto';
import { HiringVacancyInsertReq } from '@dto/progress-job-vacancy/hiring-vacancy-insert.req.dto';

@Injectable({
  providedIn: 'root',
})
export class ProgressAppliedJobVacancyService {
  constructor(private base: BaseService) {}

  updateAppliedVacancyDetailStatus(
    data: AppliedVacancyUpdateReqDto
  ): Observable<UpdateResDto> {
    return this.base.put(`${ADMIN_API}/applied`, data);
  }

  insertAssessment(
    data: AssessmentVacancyInsertReqDto
  ): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${ADMIN_API}/assessments`, data, true);
  }

  insertInterviewUser(
    data: InterviewVacancyInsertDto
  ): Observable<InsertResDto> {
    return this.base.post(`${ADMIN_API}/interviews`, data);
  }

  insertMcu(data: McuVacancyInsertReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${ADMIN_API}/mcus`, data, true);
  }

  insertOffering(data: OfferingInsertReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${ADMIN_API}/offerings`, data, true);
  }

  insertHiring(data: HiringVacancyInsertReq): Observable<InsertResDto> {
    return this.base.post(`${ADMIN_API}/hired-employees`, data);
  }
}
