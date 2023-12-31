import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, Observer } from 'rxjs';
import { ProfileResDto } from '@dto/profile/profile.res.dto';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';
import {
  ProfileUpdateAdminReqDto,
  ProfileUpdateCandidateReqDto,
} from '@dto/profile/profile-update.req.dto';
import { UpdateResDto } from '@dto/update.res.dto';
import { CandidateEducationInsertReqDto } from '@dto/candidate/candidate-education-insert.req.dto';
import { InsertResDto } from '@dto/insert.res.dto';
import { CandidateExperienceReqDto } from '@dto/candidate/candidate-experience-insert.req.dto';
import { CandidateDocumentInsertReqDto } from '@dto/candidate/candidate-document-insert.req.dto';
import { CandidateEducationResDto } from '@dto/candidate/candidate-education.res.dto';
import { CandidateExperienceResDto } from '@dto/candidate/candidate-experience.res.dto';
import { CandidateSkillResDto } from '@dto/candidate/candidate-skill.res.dto';
import { CandidateSkillInsertReqDto } from '@dto/candidate/candidate-skill-insert.req.dto';
import { CandidateDocumentResDto } from '@dto/candidate/candidate-document.res.dto';
import { ProfileAdminResDto } from '@dto/profile/profile-admin.res.dto';
import { CandidateProfileUpdateReqDto } from '@dto/candidate/candidate-profile-update.req.dto';
import { DeleteResDto } from '@dto/delete.res.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  data?: Observable<string>;
  private dataObserver?: Observer<string>;

  constructor(private base: BaseService) {
    this.data = new Observable<string>(
      (observer) => (this.dataObserver = observer)
    );
  }

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
  // ================= GET DATA =================

  // ================= DELETE DATA =================
  deleteSkill(skillId: string): Observable<DeleteResDto> {
    return this.base.delete(`${CANDIDATE_API}/skills?skillId=${skillId}`);
  }

  deleteEducation(skillId: string): Observable<DeleteResDto> {
    return this.base.delete(
      `${CANDIDATE_API}/educations?educationId=${skillId}`
    );
  }

  deleteExperience(skillId: string): Observable<DeleteResDto> {
    return this.base.delete(
      `${CANDIDATE_API}/experiences?experienceId=${skillId}`
    );
  }

  // ================= NAVBAR =================

  navbarObservable(id: string) {
    this.dataObserver?.next(id);
  }
  // ================= NAVBAR =================
}
