import { CandidateDocumentResDto } from '@dto/candidate/candidate-document.res.dto';
import { CandidateEducationResDto } from '@dto/candidate/candidate-education.res.dto';
import { CandidateExperienceResDto } from '@dto/candidate/candidate-experience.res.dto';
import { CandidateSkillResDto } from '@dto/candidate/candidate-skill.res.dto';

export interface AppliedVacancyCandidateDetailsResDto {
  id: string;
  candidateName: string;
  profileAddress: string;
  phoneNumber: string;
  expectedSalary: string;
  genderName: string;
  maritalName: string;
  nationalityName: string;
  religionName: string;
  photoId: string;
  appliedStatus: string;
  appliedProgress: string;
  picHrId: string;
  picHrName: string;
  picUserId: string;
  picUserName: string;
  jobTitle: string;
  experiences: CandidateExperienceResDto[];
  educations: CandidateEducationResDto[];
  skills: CandidateSkillResDto[];
  documents: CandidateDocumentResDto[];
}
