import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ProfileResDto } from '@dto/profile/profile.res.dto';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';
import { ProfileUpdateReqDto } from '@dto/profile/profile-update.req.dto';
import { UpdateResDto } from '@dto/UpdateResDto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private base: BaseService) {}

  getProfile(): Observable<ProfileResDto> {
    return this.base.get(`${CANDIDATE_API}/candidates`);
  }

  updateProfile(data: ProfileUpdateReqDto): Observable<UpdateResDto> {
    return this.base.put(`${CANDIDATE_API}/candidates/profile`, data);
  }
}
