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
import { CompanyResDto } from '@dto/company/company.res.dto';
import { RoleResDto } from '@dto/data-master/role.res.dto';
import { CompanyService } from '@services/company.service';
import { RoleService } from '@services/role.service';
import { UsersService } from '@services/users.service';
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
    private cd: ChangeDetectorRef
  ) {}

  getData() {
    firstValueFrom(this.roleService.getAllRole())
      .then((res) => (this.roles = res))
      .catch((err) => console.log(err));

    firstValueFrom(this.companyService.getAllCompany())
      .then((res) => (this.companies = res))
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
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
      console.log('ISI DULU');
      this.loading = false;
    }
  }
}
