import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login-answer.component.html',
})
export class LoginQuestionAnswerComponent implements OnInit {
  constructor(
    private title: Title,
    private loginService: LoginService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute
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
            localStorage.setItem('candidateCode', JSON.stringify(result.candidateCode));
            firstValueFrom(this.route.paramMap).then((res) => {
              const jobId = res.get('jobId')
              const assessmentId = res.get('assessmentId')
              const candidateCode = res.get('candidateCode')
              this.router.navigateByUrl(`/questions-answer/${jobId}/${assessmentId}/${candidateCode}`);
            })
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
