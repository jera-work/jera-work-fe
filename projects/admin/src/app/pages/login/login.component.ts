import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoginService } from '@services/login.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loading = false;

  loginReqDto = this.fb.group({
    userEmail: ['', [Validators.required]],
    userPass: ['', [Validators.required]],
  });

  // Constructor
  constructor(
    private fb: NonNullableFormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginReqDto.valid) {
      const data = this.loginReqDto.getRawValue();
      this.loading = true;
      firstValueFrom(this.loginService.loginAdmin(data))
        .then((res) => {
          this.loading = false;
          localStorage.setItem('data', JSON.stringify(res));
          this.router.navigateByUrl('/dashboard');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
