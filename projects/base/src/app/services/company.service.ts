import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { CompanyResDto } from '@dto/company/company.res.dto';
import { ADMIN_API } from '@constant/api.constant';
import { InsertResDto } from '@dto/insert.res.dto';
import { CompanyInsertReqDto } from '@dto/company/company-insert.req.dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private base: BaseService) {}

  getAllCompany(): Observable<CompanyResDto[]> {
    return this.base.get(`${ADMIN_API}/companies`);
  }

  insertCompany(data: CompanyInsertReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${ADMIN_API}/companies`, data);
  }
}
