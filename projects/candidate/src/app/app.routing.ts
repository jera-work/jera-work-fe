import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from '@components/base/base.module';
import { BaseComponent } from '@components/base/base.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { roleValidation } from './validation/role.validation';
import { Roles } from './constant/role.constant';
// import {
//   authNonLoginValidation,
//   authValidation,
// } from './validation/auth.validation';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '@components/button/button.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: 'users',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/users/user.module').then((u) => u.UserModule),
    // canMatch: [authNonLoginValidation],
  },

  {
    path: 'login',
    component: LoginComponent,
    // canMatch: [authValidation],
  },
  {
    path: 'dashboard',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
    // canMatch: [authNonLoginValidation],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, DashboardComponent],
  imports: [
    RouterModule.forRoot(routes),
    BaseModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonComponent,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class AppRouting {}
