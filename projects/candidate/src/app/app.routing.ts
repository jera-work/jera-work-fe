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
import {
  authNonLoginValidation,
  authValidation,
} from './validation/auth.validation';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '@components/button/button.component';
import { SharedModule } from '@shared/shared.module';
import { JobCardComponent } from '@components/job-card/job-card.component';
import { RegisterComponent } from './pages/register/register.component';
import { UrlPipe } from '@pipes/url.pipe';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';

const routes: Routes = [
  {
    path: 'users',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/users/user.module').then((u) => u.UserModule),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'job',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/job-details/job-details.module').then(
        (u) => u.JobDetailsModule
      ),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'saved-job',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/saved-job/saved-job.module').then(
        (u) => u.SavedJobModule
      ),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'applied-job',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/applied-job/applied-job.module').then(
        (u) => u.AppliedJobModule
      ),
    canMatch: [authNonLoginValidation],
  },

  {
    path: 'login',
    component: LoginComponent,
    canMatch: [authValidation],
  },
  {
    path: 'register',
    component: RegisterComponent,
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
  declarations: [LoginComponent, DashboardComponent, RegisterComponent],
  imports: [
    RouterModule.forRoot(routes),
    BaseModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonComponent,
    SharedModule,
    JobCardComponent,
    UrlPipe, DataViewModule
  ],
  exports: [RouterModule],
})
export class AppRouting {}
