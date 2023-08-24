import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { InterviewVacancyInsertDto } from "@dto/interview-vacancy/interview-vacancy-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/insert.res.dto";
import { ADMIN_API } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class InterviewVacancyService {

    constructor(private base: BaseService){}

    insertInterview(data: InterviewVacancyInsertDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/interviews`, data, true)
    }
}