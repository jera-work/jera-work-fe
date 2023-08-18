import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
// import { UsersResDto } from '@dto/user/users.res.dto';
import { AuthService } from '@services/auth.service';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
export class UserProfileComponent implements OnInit {
  menus: MenuItem[] | undefined;
  activeMenu: MenuItem | undefined;

  userId!: any;
  imgUrl?: string;
  loading = false;

  // Master Data

  // Profile
  genders?: any[];
  nationalities?: any[];
  maritals?: any[];
  religions?: any[];

  // Education
  degree?: any[];
  majors?: any[];

  // Master Data

  // modal boolean
  modalSkill = false;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  insertSkill = this.fb.group({
    name: ['', Validators.required],
  });

  newSkill: string[] = [];

  // Profile Form Group
  profile = this.fb.group({
    id: [0],
    username: ['', Validators.required],
    fullName: ['', Validators.required],
    phoneNumb: ['', Validators.required],
    roleName: ['', Validators.required],
    roleCode: ['', Validators.required],
    fileName: [''],
    fileExtens: [''],
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
    GPA: [0, [Validators.required]],
    startYear: ['', Validators.required],
    endYear: ['', Validators.required],
    startYearTemp: ['', Validators.required],
    endYearTemp: ['', Validators.required],
    address: ['', Validators.required],
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
    position: ['', Validators.required],
    institutionName: ['', Validators.required],
    location: ['', Validators.required],
    jobDesc: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    startDateTemp: ['', Validators.required],
    endDateTemp: ['', Validators.required],
    skill: this.fb.array([]),
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

  get skill() {
    return this.experience.get('skill') as FormArray;
  }

  removeSkill(i: number) {
    return this.skill.removeAt(i);
  }

  // ======================= Experience =======================

  // ================ GET MASTER DATA FROM DATABASE ================
  getMasterData() {
    this.genders = [
      {
        id: 1,
        name: 'Man',
      },
      {
        id: 2,
        name: 'Woman',
      },
    ];

    this.nationalities = [
      {
        id: 1,
        name: 'Indonesian',
      },
      {
        id: 2,
        name: 'Singapore',
      },
      {
        id: 3,
        name: 'Japan',
      },
      {
        id: 4,
        name: 'Australia',
      },
    ];

    this.maritals = [
      {
        id: 1,
        name: 'Single',
      },
      {
        id: 2,
        name: 'Married',
      },
      {
        id: 3,
        name: 'Divorced',
      },
    ];

    this.religions = [
      {
        id: 1,
        name: 'Moslem',
      },
      {
        id: 2,
        name: 'Christ',
      },
      {
        id: 3,
        name: 'Buddha',
      },
    ];

    this.degree = [
      {
        name: 'Doctorate Degree',
      },
      {
        name: "Master's Degree",
      },
      {
        name: "Bachelor's Degree",
      },
      {
        name: 'Senior High School',
      },
      {
        name: 'Junior High School',
      },
    ];

    this.majors = [
      {
        name: 'Agricultural Engineering',
      },
      {
        name: 'Architectural Engineering',
      },
      {
        name: 'Biochemical Engineering',
      },
    ];
  }

  // ================ GET MASTER DATA FROM DATABASE ================

  ngOnInit(): void {
    // menu
    this.menus = [
      { label: 'Profile', icon: 'pi pi-fw pi-user-edit' },
      { label: 'Education', icon: 'pi pi-fw pi-book' },
      { label: 'Experience', icon: 'pi pi-fw pi-briefcase' },
      { label: 'Documents', icon: 'pi pi-fw pi-file' },
    ];

    this.activeMenu = this.menus[0];

    const profile = this.authService.getProfile();
    if (profile?.photoId) {
      this.imgUrl = `http://localhost:8080/files/${profile.photoId}`;
    } else {
      this.imgUrl = '/assets/default.png';
    }
    this.userId = profile?.id;

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
    console.log(event);

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

        this.profile.get('fileName')?.setValue(resultBase64);
        this.profile.get('fileExtens')?.setValue(resultExtension);
      });
    }
  }

  onUpdate() {
    if (this.profile.valid) {
      this.loading = true;
      const data = this.profile.getRawValue();
      this.userService.updateProfile(data).subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      });
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
}
