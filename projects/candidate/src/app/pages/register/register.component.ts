import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoleResDto } from '@dto/role/role.res.dto';
import { RoleService } from '@services/role.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  test = this.fb.group({
    name: '',
  });

  constructor(private fb: NonNullableFormBuilder, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Register');
  }

  // userInsertReqDto = this.fb.group({
  //   username: ['', Validators.required],
  //   roleId: [0, Validators.required],
  //   fullName: ['', Validators.required],
  //   phoneNumb: ['', Validators.required],
  // });
  // sending = false;
  // constructor(
  //   private roleService: RoleService,
  //   private fb: NonNullableFormBuilder,
  //   private userService: UsersService,
  //   private router: Router,
  //   private cd: ChangeDetectorRef
  // ) {}
  // roles: RoleResDto[] = [];
  // selectedCity: RoleResDto | undefined;
  // ngOnInit(): void {
  //   this.roleService.getAllRole().subscribe((res) => {
  //     this.roles = res;
  //   });
  // }
  // ngAfterViewChecked(): void {
  //   this.cd.detectChanges();
  // }
  // onCreate() {
  //   if (this.userInsertReqDto.valid) {
  //     const data = this.userInsertReqDto.getRawValue();
  //     this.sending = true;
  //     this.userService.insert(data).subscribe((res) => {
  //       console.log('SUCCESSSSS');
  //       this.router.navigateByUrl('/users');
  //     });
  //   } else {
  //     console.log('ISI DULU');
  //     this.sending = false;
  //   }
  // }
}
