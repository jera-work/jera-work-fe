import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilesCandidateInsertReqDto } from '../dto/files/files-candidate-insert.req.dto';
import { BASE_URL } from '../constant/api.constant';
import { ReviewUpdateReqDto } from '../dto/review/review-update.req.dto';
import { CandidateAnswerInsertReqDto } from '../dto/candidate/candidate-answer-insert.req.dto';
import { Observable } from 'rxjs';
import { CandidateQuestionTotalResDto } from '../dto/candidate/candidate-question-total.res.dto';
import { CandidateStartDatesResDto } from '../dto/candidate/candidate-start-dates.res.dto';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private base: BaseService) {}

  insertFiles(data: FilesCandidateInsertReqDto[]) {
    return this.base.post(`${BASE_URL}/answers/files`, data);
  }

  startAnswer(data: ReviewUpdateReqDto) {
    return this.base.patch(`${BASE_URL}/answers/start`, data);
  }

  insertAnswer(data: CandidateAnswerInsertReqDto[]) {
    return this.base.post(`${BASE_URL}/answers/submit`, data);
  }

  getAllQuestion(): Observable<CandidateQuestionTotalResDto> {
    return this.base.get(`${BASE_URL}/answers/total-question`);
  }

  getDates(): Observable<CandidateStartDatesResDto> {
    return this.base.get(`${BASE_URL}/answers/times`);
  }
}
