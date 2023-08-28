import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login-answer.component.html',
})
export class LoginQuestionAnswerComponent implements OnInit {
  constructor(
    private title: Title,
    private loginService: LoginService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Login');
  }

  loginReqDto = this.fb.group({
    userEmail: ['', Validators.required],
    userPass: ['', Validators.required],
  });

  loading = false;

  onLogin() {
    if (this.loginReqDto.valid) {
      this.loading = true;
      this.loginService
        .loginCandidate(this.loginReqDto.getRawValue())
        .subscribe({
          next: (result) => {
            this.loading = false;
            localStorage.setItem('data', JSON.stringify(result));
            this.router.navigateByUrl('/questions-answer');
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
