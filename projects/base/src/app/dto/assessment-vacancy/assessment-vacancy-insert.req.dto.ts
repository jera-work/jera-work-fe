export interface AssessmentVacancyInsertReqDto {
    appliedVacancyId: string
	notes: string
	assessmentLocation: string
	startDate: string
	endDate: string
	isQuestion: boolean;
	score: number;
}