import { Routes, RouterModule } from '@angular/router';
import { AssignCandidateComponent } from './assign-candidate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from 'src/app/components/button/button.component';

const routes: Routes = [
  {
    path: '',
    component: AssignCandidateComponent,
  },
];

@NgModule({
  declarations: [AssignCandidateComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonComponent,
  ],
  exports: [RouterModule],
})
export class AssignCandidateRouting {}
