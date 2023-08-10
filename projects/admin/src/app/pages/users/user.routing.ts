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

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'create',
    component: UserCreateComponent,
  },
  {
    path: 'profile/:id',
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
    // UserChangePasswordComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ButtonComponent
  ],
  exports: [RouterModule],
})
export class UserRouting {}
