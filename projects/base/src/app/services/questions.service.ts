import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionResDto } from '../dto/question/question.res.dto';
import { InsertResDto } from '../dto/insert.res.dto';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { QuestionTopicInsertReqDto } from '../dto/question/question-topic-insert.req.dto';
import { QuestionTopicResDto } from '../dto/question/question-topic.res.dto';
import { QuestionPacketInsertReqDto } from '../dto/question/question-packet-insert.req.dto';
import { QuestionPacketResDto } from '../dto/question/question-packet.res.dto';
import { QuestionInsertReqDto } from '../dto/question/question-insert.req.dto';
import { QuestionTypeResDto } from '../dto/question/question-type.res.dto';
import { CandidateQuestionResDto } from '../dto/question/candidate-question.res.dto';
import { CandidateQuestionAndAnswerResDto } from '../dto/candidate/candidate-question-answer.res.dto';
import { QuestionListResDto } from '../dto/question/question-list.res.dto';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private base: BaseService) {}

  getAllQuestions(): Observable<QuestionResDto[]> {
    return this.base.get(`${BASE_URL}/questions`);
  }

  getAllQuestionList(): Observable<QuestionListResDto[]> {
    return this.base.get(`${BASE_URL}/questions/list`);
  }

  getCandidateQuestions(): Observable<QuestionResDto[]> {
    return this.base.get(`${BASE_URL}/questions/candidate`);
  }

  insertQuestionTopic(
    data: QuestionTopicInsertReqDto
  ): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/questions/topic`, data);
  }

  getAllTopic(): Observable<QuestionTopicResDto[]> {
    return this.base.get(`${BASE_URL}/questions/topic`);
  }

  insertQuestionPacket(
    data: QuestionPacketInsertReqDto
  ): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/questions/packet`, data);
  }

  getAllPacket(): Observable<QuestionPacketResDto[]> {
    return this.base.get(`${BASE_URL}/questions/packet`);
  }

  insertQuestion(data: QuestionInsertReqDto[]): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/questions`, data);
  }

  getAllType(): Observable<QuestionTypeResDto[]> {
    return this.base.get(`${BASE_URL}/questions/type`);
  }

  getById(id: number): Observable<QuestionResDto> {
    return this.base.get(`${BASE_URL}/questions/detail/${id}`);
  }

  getCandidateQuestionList(): Observable<CandidateQuestionResDto[]> {
    return this.base.get(`${BASE_URL}/questions/candidate-question-assign`);
  }

  getCandidateQuestionAndAnswer(
    id: number
  ): Observable<CandidateQuestionAndAnswerResDto[]> {
    return this.base.get(`${BASE_URL}/candidates/questions/?id=${id}`);
  }
}
