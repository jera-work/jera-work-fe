export interface OfferingInsertReqDto {
  appliedVacancyId: string;
  startDate: string;
  endDate: string;
  description: string;
  offeringLocation: string;
  isApprove: boolean;

  companyDescription: string;
  companyDescriptionFontColor: string;
  companyNameFontColor: string;
  startWork: string;
}
