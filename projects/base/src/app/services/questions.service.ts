import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionResDto } from '../dto/question/question.res.dto';
import { InsertResDto } from '../dto/insert.res.dto';
import { BaseService } from './base.service';
import { QuestionInsertQuestionReqDto } from '@dto/question/question-insert-question.req.dto';
import { ADMIN_API } from '@constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

  constructor(private base: BaseService) {}

  insertQuestion(data: QuestionInsertQuestionReqDto[]): Observable<InsertResDto> {
    return this.base.post(`${ADMIN_API}/questions`, data)
  }

  getQuestions(jobId: String): Observable<QuestionResDto[]> {
    return this.base.get(`${ADMIN_API}/questions/?jobId=${jobId}`)
  }

}
