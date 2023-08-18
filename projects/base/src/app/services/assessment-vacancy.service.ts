import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AssessmentVacancyInsertReqDto } from "@dto/assessment-vacancy/assessment-vacancy-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/InsertResDto";
import { ADMIN_API, CANDIDATE_API } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class AssessmentVacancyService {
    
    constructor(private base: BaseService){}

    insertAssessment(data: AssessmentVacancyInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/assessments`, data, true)
    }
    
}