export interface ReviewUpdateReqDto {
  candidateId: number | null;
  statusId: number | null;
  resultId: number | null;
  notes: string | null;
  score: number | null;
}
