import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { UserResDto } from '@dto/user/user.res.dto';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}

  users: UserResDto[] = [];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
