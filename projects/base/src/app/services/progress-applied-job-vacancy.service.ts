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
import { AssessmentVacancyResDto } from '@dto/progress-job-vacancy/assessment-vacancy.res.dto';
import { InterviewVacancyResDto } from '@dto/progress-job-vacancy/interview-vacancy.res.dto';
import { McuVacancyResDto } from '@dto/progress-job-vacancy/mcu-vacancy.res.dto';
import { OfferingResDto } from '@dto/progress-job-vacancy/offering.res.dto';
import { HiringVacancyResDto } from '@dto/progress-job-vacancy/hiring-vacancy.res.dto';
import { UpdateNotesProgressReqDto } from '@dto/progress-job-vacancy/update-notes-progress.req.dto';

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

  updateNotesAssessment(
    data: UpdateNotesProgressReqDto
  ): Observable<UpdateResDto> {
    return this.base.patch(`${ADMIN_API}/assessments`, data);
  }

  insertInterviewUser(
    data: InterviewVacancyInsertDto
  ): Observable<InsertResDto> {
    return this.base.post(`${ADMIN_API}/interviews`, data);
  }

  updateNotesInterviewUser(
    data: UpdateNotesProgressReqDto
  ): Observable<UpdateResDto> {
    return this.base.patch(`${ADMIN_API}/interviews`, data);
  }

  updateOfferingFromCandidate(offeringId: string): Observable<UpdateResDto> {
    return this.base.patch(
      `${ADMIN_API}/offerings?offeringId=${offeringId}`,
      null
    );
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

  getAssessment(appliedId: string): Observable<AssessmentVacancyResDto> {
    return this.base.get(`${ADMIN_API}/assessments?appliedId=${appliedId}`);
  }

  getInterviewUser(appliedId: string): Observable<InterviewVacancyResDto> {
    return this.base.get(`${ADMIN_API}/interviews?appliedId=${appliedId}`);
  }

  getMcu(appliedId: string): Observable<McuVacancyResDto> {
    return this.base.get(`${ADMIN_API}/mcus?appliedId=${appliedId}`);
  }

  getOffering(appliedId: string): Observable<OfferingResDto> {
    return this.base.get(`${ADMIN_API}/offerings?appliedId=${appliedId}`);
  }

  getHired(candidateId: string): Observable<HiringVacancyResDto> {
    return this.base.get(
      `${ADMIN_API}/hired-employees/employee?candidateId=${candidateId}`
    );
  }
}
