import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { JobVacancyInsertReqDto } from "@dto/job-vacancy/job-vacancy-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/InsertResDto";
import { ADMIN_API } from "@constant/api.constant";
import { JobSearchResDto } from "@dto/job-vacancy/job-search.res.dto";

@Injectable({
    providedIn: 'root'
})
export class JobVacancyService {

    constructor(private base: BaseService) { }

    insertJob(data: JobVacancyInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/jobs`, data, true)
    }

    search(startIndex: number, endIndex: number, vacancyTitle?: string, degreeId?: number, cityId?: number, jobTypeId?: number): Observable<JobSearchResDto> {
        return this.base.get<JobSearchResDto>(`${ADMIN_API}/jobs/
            ?startIndex=${startIndex}
            &endIndex=${endIndex}
            &vacancyTitle=${vacancyTitle}
            &cityId=${cityId}
            &jobTypeId=${jobTypeId}`, true)
    }

}