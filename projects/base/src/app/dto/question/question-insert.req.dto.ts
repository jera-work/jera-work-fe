import { QuestionOptionInsertReqDto } from './question-option-insert.req.dto';

export interface QuestionInsertReqDto {
  question: string;
  questionCode: string;
  topicId: number;
  packetId: number;
  typeId: number;
  questionOption: QuestionOptionInsertReqDto[];
}
