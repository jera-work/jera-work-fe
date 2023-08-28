import { RouterModule, Routes } from '@angular/router';
import { JobVacancyListComponent } from './list/job-vacancy-list.component';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobVacancyCreateComponent } from './create/job-vacancy-create.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { JobVacancyDetailComponent } from './detail/job-vacancy-detail.component';
import { TagModule } from 'primeng/tag';
import { AppliedCandidateComponent } from './applied-candidate/applied-candidate.component';
import { ImageModule } from 'primeng/image';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';
import { TimeAgoPipe } from '@pipes/timeago.pipe';
import { UrlPipeAdmin } from '@pipes/url.pipe';

const routes: Routes = [
  {
    path: '',
    component: JobVacancyListComponent,
  },
  {
    path: 'create',
    component: JobVacancyCreateComponent,
  },
  {
    path: ':id',
    component: JobVacancyDetailComponent,
  },
  {
    path: ':id/applied/:appliedId',
    component: AppliedCandidateComponent,
  },
];

@NgModule({
  declarations: [
    JobVacancyListComponent,
    JobVacancyCreateComponent,
    JobVacancyDetailComponent,
    AppliedCandidateComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ButtonComponent,
    TimeAgoPipe,
    UrlPipeAdmin,
  ],
  exports: [RouterModule],
})
export class JobVacancyRouting {}
