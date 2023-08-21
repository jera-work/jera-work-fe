import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Roles } from './constant/role.constant';
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

const routes: Routes = [
  {
    path: 'users',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/users/user.module').then((u) => u.UserModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'companies',
    component: BaseComponent,
    loadChildren: () => import('./pages/company/company.module').then((c) => c.CompanyModule)
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
