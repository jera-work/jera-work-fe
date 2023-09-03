import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    private title: Title,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  users: UserResDto[] = [];

  ngOnInit(): void {
    this.title.setTitle('User List');

    const data = this.authService.getProfile();

    if (data['roleCode'] === Roles.ADMIN) {
      firstValueFrom(this.usersService.getUsersByCompany()).then((res) => {
        this.users = res;
      });
    } else {
      this.usersService.getUsers().subscribe((res) => {
        this.users = res;
      });
    }
  }
}
