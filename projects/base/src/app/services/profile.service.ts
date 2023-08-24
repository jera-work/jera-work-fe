import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ProfileResDto } from '@dto/profile/profile.res.dto';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';
import {
  ProfileUpdateAdminReqDto,
  ProfileUpdateCandidateReqDto,
} from '@dto/profile/profile-update.req.dto';
import { UpdateResDto } from '@dto/UpdateResDto';
import { CandidateEducationInsertReqDto } from '@dto/candidate/candidate-education-insert.req.dto';
import { InsertResDto } from '@dto/InsertResDto';
import { CandidateExperienceReqDto } from '@dto/candidate/candidate-experience-insert.req.dto';
import { CandidateDocumentInsertReqDto } from '@dto/candidate/candidate-document-insert.req.dto';
import { CandidateEducationResDto } from '@dto/candidate/candidate-education.res.dto';
import { CandidateExperienceResDto } from '@dto/candidate/candidate-experience.res.dto';
import { CandidateSkillResDto } from '@dto/candidate/candidate-skill.res.dto';
import { CandidateSkillInsertReqDto } from '@dto/candidate/candidate-skill-insert.req.dto';
import { CandidateDocumentResDto } from '@dto/candidate/candidate-document.res.dto';
import { ProfileAdminResDto } from '@dto/profile/profile-admin.res.dto';
import { CandidateProfileUpdateReqDto } from '@dto/candidate/candidate-profile-update.req.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private base: BaseService) {}

  getProfile(): Observable<ProfileResDto> {
    return this.base.get(`${CANDIDATE_API}/candidates`);
  }

  getProfileAdmin(): Observable<ProfileAdminResDto> {
    return this.base.get(`${ADMIN_API}/users/profile`);
  }

  updateProfile(data: ProfileUpdateCandidateReqDto): Observable<UpdateResDto> {
    return this.base.put(`${CANDIDATE_API}/candidates/profile`, data);
  }

  updateProfileAdmin(data: ProfileUpdateAdminReqDto): Observable<UpdateResDto> {
    return this.base.patch(`${ADMIN_API}/users/profile`, data);
  }

  // ================= INSERT DATA =================
  insertEducations(
    data: CandidateEducationInsertReqDto[]
  ): Observable<InsertResDto> {
    return this.base.post(`${CANDIDATE_API}/educations`, data);
  }

  insertExperiences(
    data: CandidateExperienceReqDto[]
  ): Observable<InsertResDto> {
    return this.base.post(`${CANDIDATE_API}/experiences`, data);
  }

  insertSkills(data: CandidateSkillInsertReqDto[]): Observable<InsertResDto> {
    return this.base.post(`${CANDIDATE_API}/skills`, data);
  }

  insertDocuments(
    data: CandidateDocumentInsertReqDto[]
  ): Observable<InsertResDto> {
    return this.base.post(`${CANDIDATE_API}/documents`, data);
  }

  // ================= INSERT DATA =================

  // ================= GET DATA =================
  getEducations(): Observable<CandidateEducationResDto[]> {
    return this.base.get(`${CANDIDATE_API}/educations`);
  }

  getExperiences(): Observable<CandidateExperienceResDto[]> {
    return this.base.get(`${CANDIDATE_API}/experiences`);
  }

  getSkills(): Observable<CandidateSkillResDto[]> {
    return this.base.get(`${CANDIDATE_API}/skills`);
  }

  getDocuments(): Observable<CandidateDocumentResDto[]> {
    return this.base.get(`${CANDIDATE_API}/documents`);
  }
}
