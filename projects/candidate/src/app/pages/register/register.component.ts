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
  createCandidateReq = this.fb.group({
    candidateEmail: ['', Validators.required],
    candidatePassword: ['', Validators.required],
    profileName: ['', Validators.required],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private title: Title,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Register');
  }

  sending = false;

  onCreate() {
    if (this.createCandidateReq.valid) {
      const data = this.createCandidateReq.getRawValue();
      this.sending = true;
      this.userService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/login');
          this.sending = false;
          console.log('SUCCESSSSS');
        },
        error: () => {
          this.sending = false;
        },
      });
    } else {
      console.log('ISI DULU');
      this.sending = false;
    }
  }
}
