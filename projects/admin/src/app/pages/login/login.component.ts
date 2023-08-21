import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loading = false;

  loginReqDto = this.fb.group({
    userEmail: ['', [Validators.required]],
    userPass: ['', [Validators.required]],
  });

  // Constructor
  constructor(
    private fb: NonNullableFormBuilder,
    private title: Title,
    private loginService: LoginService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.title.setTitle('Login')
  }

  onLogin() {
    if (this.loginReqDto.valid) {
      this.loading = true;
      this.loginService
        .loginAdmin(this.loginReqDto.getRawValue())
        .subscribe({
          next: (result) => {
            this.loading = false;
            localStorage.setItem('data', JSON.stringify(result));
            this.router.navigateByUrl('/dashboard');
          },
          error: () => {
            this.loading = false;
          },
        });
    } else {
      console.log('Invalid!');
      this.loading = false;
    }
  }

}
