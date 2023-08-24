import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HiredEmployeeInsertReq } from "@dto/hired-employee/hired-employee-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/insert.res.dto";
import { ADMIN_API } from "@constant/api.constant";
import { BlacklistEmployeeInsertReqDto } from "@dto/blacklist-employee/blacklist-employee-insert.req.dto";

Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private base: BaseService){}

    hireEmployee(data: HiredEmployeeInsertReq): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/employees/hired`, data, true)
    }

    blacklistEmployee(data: BlacklistEmployeeInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/employees/blacklisted`, data, true)
    }

}