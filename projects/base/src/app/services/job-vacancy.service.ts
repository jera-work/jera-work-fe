import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { JobVacancyInsertReqDto } from "@dto/job-vacancy/job-vacancy-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/insert.res.dto";
import { ADMIN_API, CANDIDATE_API } from "@constant/api.constant";
import { JobSearchResDto } from "@dto/job-vacancy/job-search.res.dto";
import { JobVacancyResDto } from "@dto/job-vacancy/job-vacancy.res.dto";

@Injectable({
    providedIn: 'root'
})
export class JobVacancyService {

    constructor(private base: BaseService) { }

    detailCandidate(jobId: string): Observable<JobVacancyResDto> {
        return this.base.get<JobVacancyResDto>(`${CANDIDATE_API}/jobs/detail/?jobId=${jobId}`)
    }

    insertJob(data: JobVacancyInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/jobs`, data, true)
    }

    searchCandidate(startIndex: number, endIndex: number, vacancyTitle?: string, degreeId?: string, cityId?: string, jobTypeId?: string): Observable<JobSearchResDto[]> {
        return this.base.get<JobSearchResDto[]>(`${CANDIDATE_API}/jobs/search/?startIndex=${startIndex}&endIndex=${endIndex}&degreeId=${degreeId}&vacancyTitle=${vacancyTitle}&cityId=${cityId}&jobTypeId=${jobTypeId}`, true)
    }

    getAllJobsCandidate(): Observable<JobSearchResDto[]> {
        return this.base.get<JobSearchResDto[]>(`${CANDIDATE_API}/jobs`)
    }
    getAllJobsWithPaginationCandidate(startIndex: number, endIndex: number): Observable<JobSearchResDto[]> {
        return this.base.get<JobSearchResDto[]>(`${CANDIDATE_API}/jobs/page/?startIndex=${startIndex}&endIndex=${endIndex}`)
    }
    getLatestJobCandidate(startIndex: number, endIndex: number): Observable<JobSearchResDto[]> {
        return this.base.get<JobSearchResDto[]>(`${CANDIDATE_API}/jobs/latest/?startIndex=${startIndex}&endIndex=${endIndex}`)
    }
}