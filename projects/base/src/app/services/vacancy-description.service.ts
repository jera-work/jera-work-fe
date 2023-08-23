import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserInsertReqDto } from '@dto/user/user-insert.req.dto';
import { Observable } from 'rxjs';
import { InsertResDto } from '@dto/InsertResDto';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';
import { UserResDto } from '@dto/user/user.res.dto';
import { VacancyDescriptionResDto } from '@dto/vacancy-desc/vacancy-description.res.dto';

@Injectable({
  providedIn: 'root',
})
export class VacancyDescriptionService {
  constructor(private base: BaseService) {}

  getDescCandidate(descId: string): Observable<VacancyDescriptionResDto> {
    return this.base.get<VacancyDescriptionResDto>(`${CANDIDATE_API}/vacancy-descriptions/?descId=${descId}`,true);
  }
}
