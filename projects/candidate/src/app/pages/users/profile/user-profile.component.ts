import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { UsersResDto } from '@dto/user/users.res.dto';
import { AuthService } from '@services/auth.service';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface NewSkill {
  name: string;
}

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  userId!: any;
  imgUrl?: string;
  loading = false;

  // Master Data
  genders?: any[];
  nationalities?: any[];
  maritals?: any[];
  religions?: any[];

  // autocomplete
  skills: any[] | undefined;
  selectedSkills: any[] | undefined;
  filteredSkills?: any[] | undefined;

  // custom skills
  visible: boolean = false;

  // formGroup = this.fb.group({
  //   selectedSkill: this.fb.array([]),
  // });

  // get skill() {
  //   return this.formGroup.get('selectedSkill') as FormArray;
  // }

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  skillData: string[] = [];

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
    skill: this.fb.array(this.skillData),
  });

  insertSkill = this.fb.group({
    name: '',
  });

  get skill() {
    return this.profile.get('skill') as FormArray;
  }

  removeSkill(i: number) {
    return this.skill.removeAt(i);
  }

  ngOnInit(): void {
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

    this.skills = [
      {
        name: 'Front End Dev',
        code: 'FE',
      },
      {
        name: 'Back End Dev',
        code: 'BE',
      },
      {
        name: 'General Affair',
        code: 'GA',
      },
      {
        name: 'Data Science',
        code: 'DS',
      },
    ];

    this.countries = [
      { name: 'afgan', code: 'aa' },
      { name: 'afgon', code: 'ab' },
      {
        name: 'test',
        code: 'tt',
      },
    ];
  }

  filterSkills(event: AutoCompleteCompleteEvent) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered!: any[];
    let query = event.query;

    for (let i = 0; i < (this.skills as any[]).length; i++) {
      let skill = (this.skills as any[])[i];
      if (skill.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(skill);
        filtered.push(skill);
        // this.skill.push(skill);
      }
    }

    this.filteredSkills?.push(filtered);

    console.log(filtered);
  }

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

  countries: any[] | undefined;

  selectedCountries: any[] | undefined;

  filteredCountries: any[] = [];

  filterCountry(event: AutoCompleteCompleteEvent) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    console.log(filtered);

    this.filteredCountries = filtered;
  }

  showModal() {
    this.visible = true;
  }

  onChange() {
    const data = this.insertSkill.get('name');
    this.skill.push(data);
    this.visible = false;
  }

  onClose() {
    this.visible = false;
  }
}
