import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Roles } from '@constant/role.constant';
import { UserResDto } from '@dto/user/user.res.dto';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {}

  users: UserResDto[] = [];

  ngOnInit(): void {
    const data = this.authService.getProfile();

    if (data['roleCode'] === Roles.ADMIN) {
      firstValueFrom(this.usersService.getUsersByCompany()).then((res) => {
        this.users = res;
        console.log(res);
      });
    } else {
      this.usersService.getUsers().subscribe((res) => {
        this.users = res;
      });
    }
  }
}
