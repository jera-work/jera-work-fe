import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserInsertReqDto } from '@dto/user/user-insert.req.dto';
import { Observable } from 'rxjs';
import { InsertResDto } from '@dto/insert.res.dto';
import { ADMIN_API } from '@constant/api.constant';
import { UserResDto } from '@dto/user/user.res.dto';
import { ChangePasswordReqDto } from '@dto/user/user-change-password.req.dto';
import { UpdateResDto } from '@dto/update.res.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private base: BaseService) {}

  createUser(data: UserInsertReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${ADMIN_API}/users`, data);
  }

  getUsersByRole(roleCode: string): Observable<UserResDto[]> {
    return this.base.get<UserResDto[]>(
      `${ADMIN_API}/users/?roleCode=${roleCode}`
    );
  }

  getUsers(): Observable<UserResDto[]> {
    return this.base.get(`${ADMIN_API}/users/all`);
  }

  changePassword(data: ChangePasswordReqDto): Observable<UpdateResDto> {
    return this.base.patch(`${ADMIN_API}/users/change-password`, data);
  }
}
