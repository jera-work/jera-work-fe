import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { RoleResDto } from '../dto/role/role.res.dto';
import { BASE_URL } from '../constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private base: BaseService) {}

  getAllRole(): Observable<RoleResDto[]> {
    return this.base.get<RoleResDto[]>(`${BASE_URL}/users/roles`);
  }
}
