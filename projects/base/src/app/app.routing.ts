import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from './components/base/base.module';
import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { roleValidation } from './validation/role.validation';
import { Roles } from './constant/role.constant';
import {
  authNonLoginValidation,
  authValidation,
} from './validation/auth.validation';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from './components/button/button.component';

const routes: Routes = [
  {
    path: 'users',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/users/user.module').then((u) => u.UserModule),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'questions',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/questions/questions.module').then(
        (u) => u.QuestionModules
      ),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'assign-candidate',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/assign-candidates/assign-candidate.module').then(
        (u) => u.AssignCandidateModule
      ),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'candidates',
    loadChildren: () =>
      import('./pages/candidates/candidates.module').then(
        (u) => u.CandidatesModules
      ),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'reviews',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/review/review.module').then((u) => u.ReviewModule),
    data: [Roles.REVIEWER],
    canMatch: [authNonLoginValidation, roleValidation],
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
  declarations: [LoginComponent],
  imports: [
    RouterModule.forRoot(routes),
    BaseModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonComponent,
  ],
  exports: [RouterModule],
})
export class AppRouting {}
