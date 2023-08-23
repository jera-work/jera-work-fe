import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { InsertResDto } from '../dto/InsertResDto';
import { AssignInsertReqDto } from '../dto/candidate/assign-insert.req.dto';

@Injectable({
  providedIn: 'root',
})
export class AssignService {
  constructor(private base: BaseService) {}

  assignCandidate(data: AssignInsertReqDto): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/candidates`, data);
  }
}
