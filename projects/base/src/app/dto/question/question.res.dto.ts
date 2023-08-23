import { QuestionOptionResDto } from './question-option.res.dto';

export interface QuestionResDto {
  id: number;
  question: string;
  questionCode: string;
  questionOption: QuestionOptionResDto[];
}
