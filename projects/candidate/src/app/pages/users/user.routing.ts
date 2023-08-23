import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './profile/user-profile.component';
import { UserChangePasswordComponent } from './change-password/user-changepassword.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';
import { UrlPipeAdmin, UrlPipeCandidate } from '@pipes/url.pipe';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'changepassword',
    component: UserChangePasswordComponent,
  },
];

@NgModule({
  declarations: [UserProfileComponent, UserChangePasswordComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ButtonComponent,
    UrlPipeCandidate,
    UrlPipeAdmin
  ],
  exports: [RouterModule],
})
export class UserRouting {}
