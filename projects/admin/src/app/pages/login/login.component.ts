import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loading = false;

  loginReqDto = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  // Constructor
  constructor(
    private fb: NonNullableFormBuilder
  ) {
  }

}
