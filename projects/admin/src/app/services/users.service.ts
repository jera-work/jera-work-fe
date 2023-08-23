import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersResDto } from '../dto/user/users.res.dto';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { UserInsertReqDto } from '../dto/user/user-insert.req.dto';
import { Roles } from '../constant/role.constant';
import { UserNewPasswordInsertDto } from '../dto/user/user-new-password.insert.dto';
import { UpdateResDto } from '../dto/UpdateResDto';
import { UserUpdateStatusReqDto } from '../dto/user/user-update-status-req.dto';
import { UserUpdateReqDto } from '../dto/user/user-update.req.dto';
import { UserUpdateProfileReqDto } from '../dto/user/user-update-profile.req.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private base: BaseService) {}

  // getUser(): Observable<UsersResDto> {
  //   return
  // }

  getById(id: number): Observable<UsersResDto> {
    return this.base.get(`${BASE_URL}/users/detail?id=${id}`);
  }

  getAllUsers(): Observable<UsersResDto[]> {
    return this.base.get<UsersResDto[]>(`${BASE_URL}/users`);
  }

  insert(data: UserInsertReqDto): Observable<UsersResDto> {
    return this.base.post<UsersResDto>(`${BASE_URL}/users`, data);
  }

  getAllCandidate(): Observable<UsersResDto[]> {
    return this.base.get(`${BASE_URL}/users/role/?code=${Roles.CANDIDATE}`);
  }

  getAllReviewer(): Observable<UsersResDto[]> {
    return this.base.get(`${BASE_URL}/users/role/?code=${Roles.REVIEWER}`);
  }

  updatePassword(data: UserNewPasswordInsertDto): Observable<UpdateResDto> {
    return this.base.patch(`${BASE_URL}/users/new-password`, data);
  }

  updateStatus(data: UserUpdateStatusReqDto): Observable<UpdateResDto> {
    return this.base.patch(`${BASE_URL}/users/status`, data);
  }

  updateProfile(data: UserUpdateProfileReqDto): Observable<UpdateResDto> {
    return this.base.patch(`${BASE_URL}/users/update-profile`, data);
  }
}
