import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './list/user-list.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { UserChangePasswordComponent } from './change-password/user-changepassword.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';
import { UrlPipeAdmin } from '@pipes/url.pipe';
import { Roles } from '@constant/role.constant';
import { roleValidation } from 'projects/base/src/app/validation/role.validation';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: [Roles.SUPER_ADMIN],
    canMatch: [roleValidation], 
  },
  {
    path: 'create',
    component: UserCreateComponent,
    data: [Roles.SUPER_ADMIN],
    canMatch: [roleValidation], 
  },
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
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserProfileComponent,
    UserChangePasswordComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ButtonComponent,
    UrlPipeAdmin,
  ],
  exports: [RouterModule],
})
export class UserRouting {}
