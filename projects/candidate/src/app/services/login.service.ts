import { Injectable } from '@angular/core';
import { LoginReqDto } from '../dto/login/login.req.dto';
import { Observable } from 'rxjs';
import { LoginResDto } from '../dto/login/login.res.dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private base: BaseService) {}

  login(data: LoginReqDto): Observable<LoginResDto> {
    return this.base.post<LoginResDto>(
      'http://localhost:8080/login',
      data,
      false
    );
  }
}
