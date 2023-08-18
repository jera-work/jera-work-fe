import { QuestionOptionInsertReqDto } from "./question-option-insert.req.dto"

export interface QuestionInsertReqDto {
    jobVacancyId: string
	questionCode: string
	questionBody: string
    options: QuestionOptionInsertReqDto[]
}