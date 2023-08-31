import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Roles } from '@constant/role.constant';
// import {
//   authNonLoginValidation,
//   authValidation,
// } from './validation/auth.validation';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '@components/button/button.component';
import { BaseComponent } from '@components/base/base.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { BaseModule } from '@components/base/base.module';
import { SharedModule } from '@shared/shared.module';
import {
  authNonLoginValidation,
  authValidation,
} from './validation/auth.validation';
import { roleValidation } from 'projects/base/src/app/validation/role.validation';

const routes: Routes = [
  {
    path: 'users',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/users/user.module').then((u) => u.UserModule),
    canMatch: [authNonLoginValidation], 
  },
  {
    path: 'companies',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/company/company.module').then((u) => u.CompanyModule),
      data: [Roles.SUPER_ADMIN],
      canMatch: [authNonLoginValidation, roleValidation], 
  },
  {
    path: 'job-vacancies',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/job-vacancies/job-vacancy.module').then(
        (u) => u.JobVacancyModule
      ),
      data: [Roles.ADMIN, Roles.HR, Roles.USER],
      canMatch: [authNonLoginValidation, roleValidation], 
  },
  {
    path: 'employees',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/employees/employees.module').then(
        (u) => u.EmployeesModule
      ),
    canMatch: [authNonLoginValidation],
  },

  {
    path: 'login',
    component: LoginComponent,
    canMatch: [authValidation],
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
    canMatch: [authNonLoginValidation],
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
