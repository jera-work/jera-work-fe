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
import { MenuItem } from 'primeng/api';
import { GenderResDto } from '@dto/data-master/gender.res.dto';
import { NationalityResDto } from '@dto/data-master/nationality.res.dto';
import { MaritalStatusResDto } from '@dto/data-master/marital-status.res.dto';
import { ReligionResDto } from '@dto/data-master/religion.res.dto';
import { DegreeResDto } from '@dto/data-master/degree.res.dto';
import { MajorsResDto } from '@dto/data-master/majors.res.dto';
import { DocumentTypesResDto } from '@dto/data-master/document-types.res.dto';
import { MasterDataService } from '@services/master-data.service';
import { Subscription } from 'rxjs';
import { ProfileService } from '@services/profile.service';

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

  // Master Data

  // Profile
  genders?: GenderResDto[];
  nationalities?: NationalityResDto[];
  maritals?: MaritalStatusResDto[];
  religions?: ReligionResDto[];

  // Education
  degree?: DegreeResDto[];
  majors?: MajorsResDto[];

  // Documents
  documentTypes?: DocumentTypesResDto[];

  // Master Data

  // modal boolean
  modalSkill = false;

  // Subscriptions
  gendersSubscription?: Subscription;
  nationalitiesSubscription?: Subscription;
  maritalsSubscription?: Subscription;
  religionsSubsription?: Subscription;
  degreeSubscription?: Subscription;
  majorsSubscription?: Subscription;
  documentTypesSubscription?: Subscription;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private master: MasterDataService,
    private cd: ChangeDetectorRef,
    private profileServ: ProfileService
  ) {}

  insertSkill = this.fb.group({
    name: ['', Validators.required],
  });

  newSkill: string[] = [];

  // Profile Form Group
  profile = this.fb.group({
    id: [0],
    candidateEmail: ['', Validators.required],
    profileName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    profileAddress: ['', Validators.required],
    genderId: ['', [Validators.required]],
    nationalityId: ['', Validators.required],
    maritalId: ['', Validators.required],
    religionId: ['', Validators.required],
    expectedSalary: ['', Validators.required],
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
    majorsId: ['', Validators.required],
    gpa: [0, [Validators.required]],
    startYear: ['', Validators.required],
    endYear: ['', Validators.required],
    startYearTemp: ['', Validators.required],
    endYearTemp: ['', Validators.required],
    institutionAddress: ['', Validators.required],
  });

  educationsReqDto = this.fb.group({
    educations: this.fb.array([]),
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
    formerJobDesc: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    startDateTemp: ['', Validators.required],
    endDateTemp: ['', Validators.required],
  });

  experiencesReqDto = this.fb.group({
    experiences: this.fb.array([]),
  });

  get experiences() {
    return this.experiencesReqDto.get('experiences') as FormArray;
  }

  removeExperience(i: number) {
    this.experiences.removeAt(i);
  }

  skills = this.fb.group({
    skillArr: this.fb.array([]),
  });

  get skill() {
    return this.skills.get('skillArr') as FormArray;
  }

  removeSkill(i: number) {
    return this.skill.removeAt(i);
  }

  // ======================= Experience =======================

  // ======================= Documents =======================
  modalDocuments = false;
  isDeleteDocuments = false;

  documents = this.fb.group({
    data: this.fb.array([]),
  });

  get documentsArr() {
    return this.documents.get('data') as FormArray;
  }

  // ======================= Documents =======================

  // ================ GET MASTER DATA FROM DATABASE ================
  getMasterData() {
    this.gendersSubscription = this.master.getGenders().subscribe((res) => {
      console.log(res);
      this.genders = res;
    });

    this.nationalitiesSubscription = this.master
      .getNationalities()
      .subscribe((res) => {
        console.log(res);

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

    this.documentTypesSubscription = this.master
      .getDocumentTypes()
      .subscribe((res) => {
        console.log(res);
        this.documentTypes = res;

        for (let i = 0; i < res.length; i++) {
          this.documentsArr.push(
            this.fb.group({
              documentTypeId: res[i].typeName,
              fileContent: '',
              fileExt: '',
            })
          );
        }
      });
  }

  // ================ GET MASTER DATA FROM DATABASE ================

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    if (profile?.photoId) {
      this.imgUrl = profile.photoId.toString();
    }
    this.userId = profile?.id;

    this.profileServ.getProfile().subscribe((res) => {
      console.log(res);
      this.imgUrl = res.photoId;
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

      // candidateEmail: ['', Validators.required],
      // profileName: ['', Validators.required],
      // phoneNumber: ['', Validators.required],
      // profileAddress: ['', Validators.required],
      // genderId: ['', [Validators.required]],
      // nationalityId: ['', Validators.required],
      // maritalId: ['', Validators.required],
      // religionId: ['', Validators.required],
      // expectedSalary: ['', Validators.required],
    });

    // this.userService.getById(this.userId).subscribe((res) => {
    //   console.log(res);

    //   this.profile.get('id')?.setValue(res.id);
    //   this.profile.get('username')?.setValue(res.username);
    //   this.profile.get('fullName')?.setValue(res.fullName);
    //   this.profile.get('roleName')?.setValue(res.roleName);
    //   this.profile.get('roleCode')?.setValue(res.roleCode);
    //   this.profile.get('isActive')?.setValue(res.isActive);
    //   this.profile.get('phoneNumb')?.setValue(res.phoneNumb);
    // });

    this.getMasterData();
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

  fileUpload(event: any) {
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
  }

  onUpdate() {
    if (this.profile.valid) {
      this.loading = true;
      const data = this.profile.getRawValue();
      console.log(data);

      this.profileServ.updateProfile(data).subscribe((res) => {
        console.log(res);
      });
      // this.userService.updateProfile(data).subscribe((res) => {
      //   console.log(res);
      //   this.router.navigateByUrl('/dashboard');
      // });
    }
  }

  // =========================== Education ===========================
  showModalEducation() {
    this.modalEducation = true;
  }

  onCreateEducation() {
    const data = this.education.getRawValue();
    this.educations.push(this.fb.group(data));
    this.education.reset();
    this.modalEducation = false;
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

  showDeleteFuncEducation() {
    this.modalDeleteEducation = true;
  }
  // =========================== Education ===========================

  // =========================== Experience ===========================
  showModalExperience() {
    this.modalExperience = true;
  }

  onCreateExperience() {
    const data = this.experience.getRawValue();
    this.experiences.push(this.fb.group(data));
    this.experiences.reset();
    this.modalExperience = false;
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

  showDeleteFuncExperience() {
    this.modalDeleteExperience = true;
  }

  showModalSkill() {
    this.modalSkill = true;
  }

  onCreateSkill() {
    const data = this.insertSkill.get('name')?.getRawValue();
    this.skill.push(this.fb.control(data));
    this.insertSkill.reset();
    this.modalSkill = false;
  }

  onCloseSkill() {
    this.modalSkill = false;
  }
  // =========================== Experience ===========================

  // =========================== Documents ===========================
  showModalDocuments() {
    this.modalDocuments = true;
  }

  documentsUpload(event: any, id: string, index: number) {
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
          file.name.indexOf('.') + 1,
          file.name.length
        );

        this.documentsArr.at(index).setValue({
          documentTypeId: id,
          fileExt: resultExtension,
          fileContent: resultBase64,
        });
      });
    }
  }

  onInsertDocuments() {}

  // =========================== Documents ===========================

  // CHANGE DETECTOR
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  // DESTROY
  ngOnDestroy(): void {
    this.gendersSubscription?.unsubscribe();
    this.nationalitiesSubscription?.unsubscribe();
    this.maritalsSubscription?.unsubscribe();
    this.religionsSubsription?.unsubscribe();
    this.degreeSubscription?.unsubscribe();
    this.majorsSubscription?.unsubscribe();
  }
}
