import { CandidateAssignInsertReqDto } from './candidate-assign-insert.req.dto';

export interface AssignInsertReqDto {
  candidateAssignList: CandidateAssignInsertReqDto[];
  reviewerId: number;
  candidateId: number;
  questionId: number[];
}
