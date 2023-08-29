import { QuestionOptionInsertReqDto } from "../question-option/question-option-insert.dto"

export interface QuestionInsertQuestionReqDto {
	jobVacancyId : string
	questionCode : string
	questionBody : string
	options : QuestionOptionInsertReqDto[]
}