import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersResDto } from '../dto/user/users.res.dto';
import { BaseService } from './base.service';
import { CANDIDATE_API, ADMIN_API } from '../constant/api.constant';
import { UserInsertReqDto } from '../dto/user/user-insert.req.dto';
import { Roles } from '../constant/role.constant';
import { UserNewPasswordInsertDto } from '../dto/user/user-new-password.insert.dto';
import { UpdateResDto } from '../dto/UpdateResDto';
import { UserUpdateReqDto } from '../dto/user/user-update.req.dto';
import { UserUpdateProfileReqDto } from '../dto/user/user-update-profile.req.dto';
import { RegisterInsertReqDto } from '@dto/register/register-insert.req.dto';
import { RegisterResDto } from '@dto/register/register.res.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private base: BaseService) {}

  // getUser(): Observable<UsersResDto> {
  //   return
  // }

  getById(id: number): Observable<UsersResDto> {
    return this.base.get(`${CANDIDATE_API}/users/detail?id=${id}`);
  }

  getAllUsers(): Observable<UsersResDto[]> {
    return this.base.get<UsersResDto[]>(`${CANDIDATE_API}/users`);
  }

  insert(data: UserInsertReqDto): Observable<UsersResDto> {
    return this.base.post<UsersResDto>(`${CANDIDATE_API}/users`, data);
  }

  create(data: RegisterInsertReqDto): Observable<RegisterResDto> {
    return this.base.post(`${CANDIDATE_API}`, data);
  }

  getAllCandidate(): Observable<UsersResDto[]> {
    return this.base.get(
      `${CANDIDATE_API}/users/role/?code=${Roles.CANDIDATE}`
    );
  }

  getAllReviewer(): Observable<UsersResDto[]> {
    return this.base.get(`${CANDIDATE_API}/users/role/?code=${Roles.REVIEWER}`);
  }

  updatePassword(data: UserNewPasswordInsertDto): Observable<UpdateResDto> {
    return this.base.patch(`${CANDIDATE_API}/users/new-password`, data);
  }

  updateProfile(data: UserUpdateProfileReqDto): Observable<UpdateResDto> {
    return this.base.patch(`${CANDIDATE_API}/users/update-profile`, data);
  }
}
