import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { InsertSavedJobReqDto } from "@dto/saved-vacancy/saved-vacancy-insert.res.dto";
import { Observable } from 'rxjs';
import { InsertResDto } from "@dto/insert.res.dto";
import { CANDIDATE_API } from "@constant/api.constant";
import { SavedJobResDto } from "@dto/saved-vacancy/saved-vacancy-res.dto";
import { DeleteResDto } from "@dto/delete.res.dto";

@Injectable({
    providedIn: 'root'
})
export class SavedVacancyService {

    constructor(private base: BaseService){}

    insertSavedJob(data: InsertSavedJobReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${CANDIDATE_API}/save-jobs`, data);
    }

    getMySavedJobs(startIndex: number, endIndex: number): Observable<SavedJobResDto[]> {
        return this.base.get(`${CANDIDATE_API}/save-jobs/my-saved/?startIndex=${startIndex}&endIndex=${endIndex}`, true)
    }

    getByJobAndCandidate(jobId: string): Observable<SavedJobResDto>{
        return this.base.get(`${CANDIDATE_API}/save-jobs/?jobId=${jobId}`, true)
    }

    deleteSavedJobs(savedId: string): Observable<DeleteResDto> {
        return this.base.delete(`${CANDIDATE_API}/save-jobs/?savedId=${savedId}`, true)
    }
}