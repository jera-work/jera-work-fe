import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { UsersResDto } from 'src/app/dto/user/users.res.dto';
import { AuthService } from 'src/app/services/auth.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  userId!: any;
  imgUrl?: string;
  loading = false;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    if (profile?.photoId) {
      this.imgUrl = `http://localhost:8080/files/${profile.photoId}`;
    } else {
      this.imgUrl = '/assets/default.png';
    }
    this.userId = profile?.id;

    this.userService.getById(this.userId).subscribe((res) => {
      console.log(res);

      this.profile.get('id')?.setValue(res.id);
      this.profile.get('username')?.setValue(res.username);
      this.profile.get('fullName')?.setValue(res.fullName);
      this.profile.get('roleName')?.setValue(res.roleName);
      this.profile.get('roleCode')?.setValue(res.roleCode);
      this.profile.get('isActive')?.setValue(res.isActive);
      this.profile.get('phoneNumb')?.setValue(res.phoneNumb);
    });
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
}
