import { Injectable } from '@angular/core';
import { LoginReqDto } from '../dto/login/login.req.dto';
import { Observable } from 'rxjs';
import { LoginResDto } from '../dto/login/login.res.dto';
import { BaseService } from './base.service';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private base: BaseService) {}

  loginAdmin(data: LoginReqDto): Observable<LoginResDto> {
    return this.base.post<LoginResDto>(`${ADMIN_API}`, data, false);
  }

  loginCandidate(data: LoginReqDto): Observable<LoginResDto> {
    return this.base.post(`${CANDIDATE_API}/login`, data, false);
  }
}
