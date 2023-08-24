export interface ProfileUpdateCandidateReqDto {
  candidateEmail: string;
  profileAddress: string;
  phoneNumber: string;
  expectedSalary: string;
  photoContent: string;
  photoExt: string;
  genderId: string;
  maritalId: string;
  nationalityId: string;
  religionId: string;
  profileName: string;
}

export interface ProfileUpdateAdminReqDto {
  userEmail: string;
  profileName: string;
  phoneNumber: string;
  profileAddress: string;
  fileExt: string;
  fileContent: string;
}
