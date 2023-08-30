import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  imgUrl?: string;
  loading = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {}

  profile = this.fb.group({
    userEmail: ['', Validators.required],
    profileName: ['', Validators.required],
    phoneNumber: [''],
    profileAddress: [''],
    companyName: [''],
    roleName: [''],
    fileContent: [''],
    fileExt: [''],
    isActive: ['true'],
  });

  ngOnInit(): void {
    firstValueFrom(this.profileService.getProfileAdmin()).then((res) => {
      // console.log(res);
      if (res.photoId) {
        this.imgUrl = res.photoId;
      }

      this.profile.patchValue({
        userEmail: res.userEmail,
        profileName: res.profileName,
        profileAddress: res.profileAddress,
        phoneNumber: res.phoneNumber,
        companyName: res.companyName,
        roleName: res.roleName,
      });
    });
  }

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

        this.profile.get('fileContent')?.setValue(resultBase64);
        this.profile.get('fileExt')?.setValue(resultExtension);
      });
    }
  }

  onUpdate() {
    if (this.profile.valid) {
      this.loading = true;
      const data = this.profile.getRawValue();
      firstValueFrom(this.profileService.updateProfileAdmin(data)).then(
        (res) => {
          console.log(res);
          firstValueFrom(this.profileService.getProfileAdmin()).then((res) => {
            this.profileService.navbarObservable(res.photoId);
          });
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        }
      );
    }
  }
}
