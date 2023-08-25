import { QuestionOptionResDto } from "../question-option/question-option.res.dto"

export interface QuestionResDto {
	id : string
	questionCode : string
	questionBody : string
	options : QuestionOptionResDto[]	
}