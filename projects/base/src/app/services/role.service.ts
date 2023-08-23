import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { RoleResDto } from '../dto/data-master/role.res.dto';
import { CANDIDATE_API } from '../constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private base: BaseService) {}

  getAllRole(): Observable<RoleResDto[]> {
    return this.base.get<RoleResDto[]>(`${CANDIDATE_API}/users/roles`);
  }
}
