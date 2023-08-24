import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RegisterReqDto } from '@dto/candidate/register.req.dto';
import { Observable } from 'rxjs';
import { InsertResDto } from '@dto/insert.res.dto';
import { CANDIDATE_API } from '@constant/api.constant';
import { CandidateProfileUpdateReqDto } from '@dto/candidate/candidate-profile-update.req.dto';
import { UpdateResDto } from '@dto/update.res.dto';
import { CandidateDocumentInsertReqDto } from '@dto/candidate/candidate-document-insert.req.dto';
import { CandidateEducationInsertReqDto } from '@dto/candidate/candidate-education-insert.req.dto';
import { CandidateExperienceReqDto } from '@dto/candidate/candidate-experience-insert.req.dto';
import { CandidateSkillInsertReqDto } from '@dto/candidate/candidate-skill-insert.req.dto';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor(private base: BaseService) {}

  register(data: RegisterReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(
      `${CANDIDATE_API}/candidates/register`,
      data,
      true
    );
  }

  updateProfile(data: CandidateProfileUpdateReqDto): Observable<UpdateResDto> {
    return this.base.put<UpdateResDto>(
      `${CANDIDATE_API}/candidates/profile`,
      data,
      true
    );
  }

  insertDocs(data: CandidateDocumentInsertReqDto[]): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(
      `${CANDIDATE_API}/candidates/documents`,
      data,
      true
    );
  }

  insertEducations(
    data: CandidateEducationInsertReqDto[]
  ): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(
      `${CANDIDATE_API}/candidates/educations`,
      data,
      true
    );
  }

  insertExperiences(
    data: CandidateExperienceReqDto[]
  ): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(
      `${CANDIDATE_API}/candidates/experiences`,
      data,
      true
    );
  }

  insertSkill(data: CandidateSkillInsertReqDto[]): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(
      `${CANDIDATE_API}/candidates/skills`,
      data,
      true
    );
  }
}
