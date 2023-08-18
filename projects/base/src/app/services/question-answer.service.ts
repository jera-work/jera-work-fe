import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { QuestionAnswerInsertReqDto } from "@dto/question-answer/question-answer-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/InsertResDto";
import { ADMIN_API, CANDIDATE_API } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class QuestionAnswerService {
    constructor(private base: BaseService) { }

    insertAnswer(data: QuestionAnswerInsertReqDto[]): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${CANDIDATE_API}/answers`, data, true)
    }
    
}