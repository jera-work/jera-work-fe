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

  sending = false;

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

  ngOnInit(): void {
    this.roleService.getAllRole().subscribe((result) => {
      this.roles = result;
    });

    this.companyService.getAllCompany().subscribe((result) => {
      this.companies = result;
    });
  }

  ngAfterViewChecked(): void {}

  onCreate() {
    if (this.userInsertReqDto.valid) {
      const data = this.userInsertReqDto.getRawValue();
      this.sending = true;
      this.userService.createUser(data).subscribe((res) => {
        console.log('SUCCESSSSS');
        this.router.navigateByUrl('/users');
      });
    } else {
      console.log('ISI DULU');
      this.sending = false;
    }
  }
}
