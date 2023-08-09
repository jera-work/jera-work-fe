import { Component, OnInit } from '@angular/core';
import { UsersResDto } from '@dto/user/users.res.dto';
import { UsersService } from '@services/users.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}

  users: UsersResDto[] = [];

  visible: boolean = false;
  statusReq = this.fb.group({
    id: [0, Validators.required],
    isActive: [null, Validators.required],
  });

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getSeverity(status: string): string {
    if (status) {
      return 'success';
    } else {
      return 'danger';
    }
  }

  showDialog(userId: number) {
    this.visible = true;
    this.statusReq.get('id')?.setValue(userId);
  }

  onChange() {
    const data = this.statusReq.getRawValue();
    this.usersService.updateStatus(data).subscribe((res) => console.log(res));
    this.visible = false;
  }

  onClose() {
    this.visible = false;
  }
}
