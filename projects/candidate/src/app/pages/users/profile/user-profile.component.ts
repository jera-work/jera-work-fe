import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UsersService } from '@services/users.service';
// import { UsersResDto } from '@dto/user/users.res.dto';
import { AuthService } from '@services/auth.service';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { GenderResDto } from '@dto/data-master/gender.res.dto';
import { NationalityResDto } from '@dto/data-master/nationality.res.dto';
import { MaritalStatusResDto } from '@dto/data-master/marital-status.res.dto';
import { ReligionResDto } from '@dto/data-master/religion.res.dto';
import { DegreeResDto } from '@dto/data-master/degree.res.dto';
import { MajorsResDto } from '@dto/data-master/majors.res.dto';
import { DocumentTypesResDto } from '@dto/data-master/document-types.res.dto';
import { MasterDataService } from '@services/master-data.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { ProfileService } from '@services/profile.service';
import { SkillResDto } from '@dto/data-master/skill.res.dto';
import { CandidateEducationResDto } from '@dto/candidate/candidate-education.res.dto';
import { CandidateExperienceResDto } from '@dto/candidate/candidate-experience.res.dto';
import { CandidateSkillResDto } from '@dto/candidate/candidate-skill.res.dto';
import { CandidateDocumentResDto } from '@dto/candidate/candidate-document.res.dto';
import { FileUpload } from 'primeng/fileupload';
import { Title } from '@angular/platform-browser';

const convertUTCToLocalDateTime = function (date: Date) {
  const newDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
  return newDate.toISOString();
};

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  menus: MenuItem[] | undefined;
  activeMenu: MenuItem | undefined;

  userId!: any;
  imgUrl?: string;
  loading = false;

  // Profile Data
  educationsData?: CandidateEducationResDto[];
  experiencesData?: CandidateExperienceResDto[];
  skillsData?: CandidateSkillResDto[];
  documentsData?: CandidateDocumentResDto[];

  // Master Data

  // Profile
  genders?: GenderResDto[];
  nationalities?: NationalityResDto[];
  maritals?: MaritalStatusResDto[];
  religions?: ReligionResDto[];

  // Education
  degree?: DegreeResDto[];
  majors?: MajorsResDto[];

  // Skills
  skills?: SkillResDto[];

  // Documents
  documentTypes?: DocumentTypesResDto[];

  // Master Data

  // modal boolean
  modalSkill = false;
  modalDeleteSkill = false;

  // Subscriptions
  profileSubscription?: Subscription;
  gendersSubscription?: Subscription;
  nationalitiesSubscription?: Subscription;
  maritalsSubscription?: Subscription;
  religionsSubsription?: Subscription;
  degreeSubscription?: Subscription;
  majorsSubscription?: Subscription;
  skillsSubscription?: Subscription;
  documentTypesSubscription?: Subscription;
  insertExperienceSubscription?: Subscription;
  insertEducationSubscription?: Subscription;
  insertSkillSubscription?: Subscription;
  insertDocumentsSubscription?: Subscription;
  getEducationsSubscription?: Subscription;
  getExperiencesSubscription?: Subscription;
  getSkillsSubscription?: Subscription;
  getDocumentsSubscription?: Subscription;

  constructor(
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private master: MasterDataService,
    private cd: ChangeDetectorRef,
    private profileServ: ProfileService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  // Loading
  loadingCreateEducations = false;
  loadingCreateExperiences = false;
  loadingCreateSkill = false;
  loadingCreateDocuments = false;

  insertSkill = this.fb.group({
    name: ['', Validators.required],
  });

  newSkill: string[] = [];

  // Profile Form Group
  profile = this.fb.group({
    id: [0],
    candidateEmail: ['', Validators.required],
    profileName: ['', Validators.required],
    phoneNumber: [''],
    profileAddress: [''],
    genderId: ['', Validators.required],
    nationalityId: ['', Validators.required],
    maritalId: ['', Validators.required],
    religionId: ['', Validators.required],
    expectedSalary: [''],
    photoContent: [''],
    photoExt: [''],
    isActive: [false],
  });

  // ======================= Education =======================
  // Modal Needs
  modalEducation = false;
  isDeleteEducation = false;
  modalDeleteEducation = false;

  education = this.fb.group({
    institutionName: ['', Validators.required],
    degreeId: ['', Validators.required],
    majorId: ['', Validators.required],
    gpa: [0, [Validators.required]],
    startYear: ['', Validators.required],
    endYear: ['', Validators.required],
    institutionAddress: ['', Validators.required],
    startYearTemp: ['', Validators.required],
    endYearTemp: ['', Validators.required],
  });

  educationsReqDto = this.fb.group({
    educations: this.fb.array([]),
  });

  deleteEducationReqDto = this.fb.group({
    educationId: ['', Validators.required],
  });

  get educations() {
    return this.educationsReqDto.get('educations') as FormArray;
  }

  removeEducation(i: number) {
    this.educations.removeAt(i);
  }

  // ======================= Education =======================

  // ======================= Experience =======================
  modalExperience = false;
  isDeleteExperience = false;
  modalDeleteExperience = false;

  experience = this.fb.group({
    formerPosition: ['', Validators.required],
    formerInstitution: ['', Validators.required],
    formerLocation: ['', Validators.required],
    formerJobdesc: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    startDateTemp: ['', Validators.required],
    endDateTemp: ['', Validators.required],
  });

  experiencesReqDto = this.fb.group({
    experiences: this.fb.array([]),
  });

  deleteExperienceReqDto = this.fb.group({
    experienceId: ['', Validators.required],
  });

  get experiences() {
    return this.experiencesReqDto.get('experiences') as FormArray;
  }

  removeExperience(i: number) {
    this.experiences.removeAt(i);
  }

  skillsReqDto = this.fb.group({
    skillId: ['', Validators.required],
  });

  // ======================= Experience =======================

  // ======================= Documents =======================
  modalDocuments = false;
  isDeleteDocuments = false;

  documents = this.fb.group({
    data: this.fb.array([], Validators.required),
  });

  get documentsArr() {
    return this.documents.get('data') as FormArray;
  }

  // ======================= Documents =======================

  // ================ GET MASTER DATA FROM DATABASE ================
  getData() {
    this.profileSubscription = this.profileServ
      .getProfile()
      .subscribe((res) => {
        if (res.photoId) {
          this.imgUrl = res.photoId;
        } else {
          this.imgUrl = undefined;
        }
        this.profile.patchValue({
          candidateEmail: res.candidateEmail,
          profileName: res.profileName,
          profileAddress: res.profileAddress,
          phoneNumber: res.phoneNumber,
          expectedSalary: res.expectedSalary,
          genderId: res.genderId,
          nationalityId: res.nationalityId,
          maritalId: res.maritalId,
          religionId: res.religionId,
        });
      });

    this.gendersSubscription = this.master.getGenders().subscribe((res) => {
      this.genders = res;
    });

    this.nationalitiesSubscription = this.master
      .getNationalities()
      .subscribe((res) => {
        this.nationalities = res;
      });

    this.maritalsSubscription = this.master
      .getMaritalStatus()
      .subscribe((res) => {
        this.maritals = res;
      });

    this.religionsSubsription = this.master
      .getReligions()
      .subscribe((res) => (this.religions = res));

    this.degreeSubscription = this.master
      .getDegree()
      .subscribe((res) => (this.degree = res));

    this.majorsSubscription = this.master
      .getMajors()
      .subscribe((res) => (this.majors = res));

    this.skillsSubscription = this.master.getSkills().subscribe((res) => {
      this.skills = res;
    });

    this.documentTypesSubscription = this.master
      .getDocumentTypes()
      .subscribe((res) => {
        this.documentTypes = res;

        for (let i = 0; i < res.length; i++) {
          this.documentsArr.push(
            this.fb.group({
              name: res[i].typeName,
              documentTypeId: res[i].id,
              fileContent: ['', Validators.required],
              fileExt: ['', Validators.required],
            })
          );
        }
      });

    this.getEducationsSubscription = this.profileServ
      .getEducations()
      .subscribe((res) => {
        this.educationsData = res;
      });

    this.getExperiencesSubscription = this.profileServ
      .getExperiences()
      .subscribe((res) => {
        this.experiencesData = res;
      });

    this.getSkillsSubscription = this.profileServ
      .getSkills()
      .subscribe((res) => {
        this.skillsData = res;
      });

    this.getDocumentsSubscription = this.profileServ
      .getDocuments()
      .subscribe((res) => (this.documentsData = res));
  }

  // ================ GET MASTER DATA FROM DATABASE ================

  ngOnInit(): void {
    this.getData();
    this.title.setTitle('Profile');
  }

  onActiveItemChange(event: MenuItem) {
    this.activeMenu = event;
  }

  // =================== Convert Date ===================
  convertStartYear(e: any) {
    this.education.patchValue({
      startYear: convertUTCToLocalDateTime(e),
    });
  }

  convertEndYear(e: any) {
    this.education.patchValue({
      endYear: convertUTCToLocalDateTime(e),
    });
  }

  convertStartDate(e: any) {
    this.experience.patchValue({
      startDate: convertUTCToLocalDateTime(e),
    });
  }

  convertEndDate(e: any) {
    this.experience.patchValue({
      endDate: convertUTCToLocalDateTime(e),
    });
  }
  // =================== Convert Date ===================

  fileUpload(event: any, fileUpload: FileUpload) {
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });

    for (let file of event.files) {
      toBase64(file).then((result) => {
        const resultBase64 = result.substring(
          result.indexOf(',') + 1,
          result.length
        );
        const resultExtension = file.name.substring(
          file.name.indexOf('.'),
          file.name.length
        );

        this.profile.get('photoContent')?.setValue(resultBase64);
        this.profile.get('photoExt')?.setValue(resultExtension);
      });
    }

    fileUpload.clear();
  }

  onUpdate() {
    if (this.profile.valid) {
      this.loading = true;
      const data = this.profile.getRawValue();
      firstValueFrom(this.profileServ.updateProfile(data)).then((res) => {
        firstValueFrom(this.profileServ.getProfile()).then((res) => {
          const data = this.authService.getProfile();
          data['photoId'] = res.photoId;
          console.log(data);
          localStorage.setItem('data', JSON.stringify(data));
          this.profileServ.navbarObservable(res.photoId);
          if (res.photoId) {
            this.imgUrl = res.photoId;
          } else {
            this.imgUrl = undefined;
          }
          this.profile.patchValue({
            candidateEmail: res.candidateEmail,
            profileName: res.profileName,
            profileAddress: res.profileAddress,
            phoneNumber: res.phoneNumber,
            expectedSalary: res.expectedSalary,
            genderId: res.genderId,
            nationalityId: res.nationalityId,
            maritalId: res.maritalId,
            religionId: res.religionId,
          });
          this.router.navigateByUrl('/dashboard');
        });
      });
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please input all profile data!',
      });
    }
  }

  // =========================== Education ===========================
  showModalEducation() {
    this.modalEducation = true;
  }

  onCreateEducation() {
    if (this.education) {
      this.loadingCreateEducations = true;
      const data = this.education.getRawValue();

      this.insertEducationSubscription = this.profileServ
        .insertEducations([data])
        .subscribe((res) => {
          this.loadingCreateEducations = false;
          this.getEducationsSubscription = this.profileServ
            .getEducations()
            .subscribe((res) => (this.educationsData = res));
        });
      this.educations.reset();
      this.education.reset();
      this.modalEducation = false;
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please input all education data!',
      });
    }
  }

  onCloseEducation() {
    this.modalEducation = false;
  }

  // toggle delete education
  showDeleteEducation() {
    this.isDeleteEducation = true;
  }

  hideDeleteEducation() {
    this.isDeleteEducation = false;
  }

  showDeleteFuncEducation(educationId: string) {
    this.deleteEducationReqDto.patchValue({ educationId });
    this.modalDeleteEducation = true;
  }

  deleteEducation() {
    if (this.deleteEducationReqDto.valid) {
      const data = this.deleteEducationReqDto.getRawValue().educationId;
      firstValueFrom(this.profileServ.deleteEducation(data)).then((res) => {
        this.modalDeleteEducation = false;
        this.getData();
      });
    } else {
      console.log('Fail delete');
    }
  }

  // =========================== Education ===========================

  // =========================== Experience ===========================
  showModalExperience() {
    this.modalExperience = true;
  }

  onCreateExperience() {
    if (this.experience.valid) {
      this.loadingCreateExperiences = true;
      const data = this.experience.getRawValue();
      this.insertExperienceSubscription = this.profileServ
        .insertExperiences([data])
        .subscribe((res) => {
          this.loadingCreateExperiences = false;
          this.getExperiencesSubscription = this.profileServ
            .getExperiences()
            .subscribe((res) => (this.experiencesData = res));
        });

      this.experience.reset();
      this.modalExperience = false;
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please input all experience data!',
      });
    }
  }

  onCloseExperience() {
    this.modalExperience = false;
  }

  // toggle delete Experience
  showDeleteExperience() {
    this.isDeleteExperience = true;
  }

  hideDeleteExperience() {
    this.isDeleteExperience = false;
  }

  showDeleteFuncExperience(experienceId: string) {
    this.deleteExperienceReqDto.patchValue({
      experienceId,
    });
    this.modalDeleteExperience = true;
  }

  deleteExperience() {
    if (this.deleteExperienceReqDto.valid) {
      const data = this.deleteExperienceReqDto.getRawValue();
      console.log(data.experienceId);
      firstValueFrom(this.profileServ.deleteExperience(data.experienceId)).then(
        (res) => {
          this.modalDeleteExperience = false;
          this.getData();
        }
      );
    } else {
      console.log('Fail delete');
    }
  }

  // =========================== Experience ===========================

  // =========================== Skills ===========================

  showModalSkill() {
    this.modalSkill = true;
  }

  onCreateSkill() {
    if (this.skillsReqDto.valid) {
      this.loadingCreateSkill = true;
      const data = this.skillsReqDto.getRawValue();
      this.insertSkillSubscription = this.profileServ
        .insertSkills([data])
        .subscribe((res) => {
          this.loadingCreateSkill = false;
          this.getSkillsSubscription = this.profileServ
            .getSkills()
            .subscribe((res) => (this.skillsData = res));
        });
      this.skillsReqDto.reset();
      this.modalSkill = false;
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please input skill name!',
      });
    }
  }

  onCloseSkill() {
    this.modalSkill = false;
  }

  showDeleteModalSkill(skillId: string) {
    this.modalDeleteSkill = true;
    this.skillsReqDto.patchValue({
      skillId,
    });
  }

  deleteSkill() {
    const data = this.skillsReqDto.getRawValue();
    firstValueFrom(this.profileServ.deleteSkill(data.skillId)).then((res) => {
      this.skillsReqDto.reset();
      firstValueFrom(this.profileServ.getSkills()).then(
        (res) => (this.skillsData = res)
      );
    });
    this.modalDeleteSkill = false;
  }

  hideDeleteModalSkill() {
    this.modalDeleteSkill = false;
    this.skillsReqDto.reset();
  }

  // =========================== Skills ===========================

  // =========================== Documents ===========================
  showModalDocuments() {
    this.modalDocuments = true;
  }

  documentsUpload(event: any, index: number) {
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });

    for (let file of event.files) {
      toBase64(file).then((result) => {
        const resultBase64 = result.substring(
          result.indexOf(',') + 1,
          result.length
        );
        const resultExtension = file.name.substring(
          file.name.indexOf('.'),
          file.name.length
        );

        this.documentsArr.at(index).patchValue({
          fileExt: resultExtension,
          fileContent: resultBase64,
        });
      });
    }
  }

  onInsertDocuments() {
    if (this.documentsArr.valid) {
      this.loadingCreateDocuments = true;
      const data = this.documentsArr.getRawValue();
      this.insertDocumentsSubscription = this.profileServ
        .insertDocuments(data)
        .subscribe((res) => {
          this.loadingCreateDocuments = false;
          console.log(res);
          this.getDocumentsSubscription = this.profileServ
            .getDocuments()
            .subscribe((res) => (this.documentsData = res));
        });
      this.documentsArr.reset();
      this.modalDocuments = false;
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please input all document data!',
      });
    }
  }

  // =========================== Documents ===========================

  // CHANGE DETECTOR
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  // DESTROY
  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
    this.gendersSubscription?.unsubscribe();
    this.nationalitiesSubscription?.unsubscribe();
    this.maritalsSubscription?.unsubscribe();
    this.religionsSubsription?.unsubscribe();
    this.degreeSubscription?.unsubscribe();
    this.majorsSubscription?.unsubscribe();
    this.skillsSubscription?.unsubscribe();
    this.insertEducationSubscription?.unsubscribe();
    this.insertExperienceSubscription?.unsubscribe();
    this.insertSkillSubscription?.unsubscribe();
    this.insertDocumentsSubscription?.unsubscribe();
    this.getEducationsSubscription?.unsubscribe();
    this.getExperiencesSubscription?.unsubscribe();
    this.getSkillsSubscription?.unsubscribe();
  }
}
