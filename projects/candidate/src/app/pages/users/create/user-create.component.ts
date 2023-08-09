import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleResDto } from '@dto/role/role.res.dto';
import { RoleService } from '@services/role.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent implements OnInit, AfterViewChecked {
  userInsertReqDto = this.fb.group({
    username: ['', Validators.required],
    roleId: [0, Validators.required],
    fullName: ['', Validators.required],
    phoneNumb: ['', Validators.required],
  });

  sending = false;

  constructor(
    private roleService: RoleService,
    private fb: NonNullableFormBuilder,
    private userService: UsersService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  roles: RoleResDto[] = [];

  selectedCity: RoleResDto | undefined;

  ngOnInit(): void {
    this.roleService.getAllRole().subscribe((res) => {
      this.roles = res;
    });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  onCreate() {
    if (this.userInsertReqDto.valid) {
      const data = this.userInsertReqDto.getRawValue();
      this.sending = true;
      this.userService.insert(data).subscribe((res) => {
        console.log('SUCCESSSSS');
        this.router.navigateByUrl('/users');
      });
    } else {
      console.log('ISI DULU');
      this.sending = false;
    }
  }
}
