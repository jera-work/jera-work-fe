import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { EmployeesResDto } from '@dto/employees/employees.res.dto';
import { ADMIN_API } from '@constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private base: BaseService) {}

  getHiredEmployees(): Observable<EmployeesResDto[]> {
    return this.base.get(`${ADMIN_API}/hired-employees`);
  }

  getBlackListEmployees(): Observable<EmployeesResDto[]> {
    return this.base.get(`${ADMIN_API}/blacklists`);
  }
}
