import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { InsertResDto } from '@dto/insert.res.dto';
import { ADMIN_API } from '@constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private base: BaseService) {}

  getJobVacancy(date: string): Observable<InsertResDto> {
    return this.base.get(`${ADMIN_API}/jobs/report?date=${date}`);
  }

  getAppliedCandidate(jobId: string, date: string): Observable<InsertResDto> {
    return this.base.get(
      `${ADMIN_API}/applied/report?jobId=${jobId}&date=${date}`
    );
  }

  getHiredEmployee(): Observable<InsertResDto> {
    return this.base.get(`${ADMIN_API}/hired-employees/report`);
  }
}
