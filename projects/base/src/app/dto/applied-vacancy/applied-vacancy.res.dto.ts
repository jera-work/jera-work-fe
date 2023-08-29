export interface AppliedVacancyResDto {
  id: string;
  jobVacancyId: string;
  jobVacancyCode: string;
  appliedStatusCode: string;
  appliedStatusName: string;
  appliedProgressCode: string;
  appliedProgressName: string;
  vacancyTitle: string;
  vacancyCode: string;
  companyName: string;
  salary: string;
  degreeName: string;
  jobTypeName: string;
  cityName: string;
  createdAt: string;
  companyPhotoId: string;
}

export interface AppliedVacancyAdminResDto {
  id: string;
  profileName: string;
  statusName: string;
  progressName: string;
  createdAt: string;
}
