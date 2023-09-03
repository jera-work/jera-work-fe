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
import { Roles } from '@constant/role.constant';
import { CompanyResDto } from '@dto/company/company.res.dto';
import { RoleResDto } from '@dto/data-master/role.res.dto';
import { AuthService } from '@services/auth.service';
import { CompanyService } from '@services/company.service';
import { RoleService } from '@services/role.service';
import { UsersService } from '@services/users.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
// import { RoleResDto } from '../../../dto/role/role.res.dto';
// import { RoleService } from '../../../services/role.service';
// import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent implements OnInit, AfterViewChecked {
  userInsertReqDto = this.fb.group({
    userEmail: ['', Validators.required],
    profileName: ['', Validators.required],
    roleId: ['', Validators.required],
    companyId: ['', Validators.required],
  });

  loading = false;

  roles!: RoleResDto[];
  companies!: CompanyResDto[];

  constructor(
    private roleService: RoleService,
    private companyService: CompanyService,
    private fb: NonNullableFormBuilder,
    private userService: UsersService,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private title: Title,
    private messageService: MessageService
  ) {}

  getData() {
    const data = this.authService.getProfile();
    const roleLogin = data['roleCode'];
    firstValueFrom(this.roleService.getAllRole())
      .then((res) => {
        if (roleLogin === Roles.SUPER_ADMIN) {
          this.roles = res.filter(
            (role) =>
              role.roleCode === Roles.HR ||
              role.roleCode === Roles.USER ||
              role.roleCode === Roles.ADMIN
          );
        } else if (roleLogin === Roles.ADMIN) {
          this.roles = res.filter(
            (role) => role.roleCode === Roles.HR || role.roleCode === Roles.USER
          );
        }
      })
      .catch((err) => console.log(err));

    firstValueFrom(this.companyService.getAllCompany())
      .then((res) => {
        console.log(res);
        if (roleLogin === Roles.SUPER_ADMIN) {
          this.companies = res;
        } else {
          this.companies = res.filter(
            (company) => company.id === data['companyId']
          );
          this.userInsertReqDto.patchValue({
            companyId: this.companies[0].id,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
    this.title.setTitle('Create User');
    this.getData();
  }

  ngAfterViewChecked(): void {}

  onCreate() {
    if (this.userInsertReqDto.valid) {
      const data = this.userInsertReqDto.getRawValue();
      this.loading = true;
      firstValueFrom(this.userService.createUser(data))
        .then((res) => {
          console.log(res);
          this.router.navigateByUrl('/users');
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please complete the data requirements!',
      });
      this.loading = false;
    }
  }
}
