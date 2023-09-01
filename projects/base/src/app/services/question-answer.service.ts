import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { QuestionAnswerInsertReqDto } from '@dto/question-answer/question-answer-insert.req.dto';
import { Observable } from 'rxjs';
import { InsertResDto } from '@dto/insert.res.dto';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';
import { QuestionAnswerInsertAnswerReqDto } from '@dto/question-answer/question-answer-insert-answer.req.dto';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswerService {
  constructor(private base: BaseService) {}

  insertAnswer(
    data: QuestionAnswerInsertAnswerReqDto[]
  ): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${CANDIDATE_API}/answers`, data, true);
  }
}
