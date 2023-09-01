import { RouterModule, Routes } from '@angular/router';
import { JobVacancyListComponent } from './list/job-vacancy-list.component';
import { NgModule } from '@angular/core';
import { JobVacancyCreateComponent } from './create/job-vacancy-create.component';
import { JobVacancyDetailComponent } from './detail/job-vacancy-detail.component';
import { AppliedCandidateComponent } from './applied-candidate/applied-candidate.component';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';
import { TimeAgoPipe } from '@pipes/timeago.pipe';
import { UrlPipeAdmin } from '@pipes/url.pipe';
import { JobPreviewComponent } from '@components/job-preview/job-preview.component';
import { JobVacancyEditComponent } from './edit/job-vacancy-edit.component';

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
  {
    path: ':id/edit',
    component: JobVacancyEditComponent,
  }
];

@NgModule({
  declarations: [
    JobVacancyListComponent,
    JobVacancyCreateComponent,
    JobVacancyDetailComponent,
    AppliedCandidateComponent,
    JobVacancyEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ButtonComponent,
    TimeAgoPipe,
    UrlPipeAdmin,
    JobPreviewComponent
  ],
  exports: [RouterModule],
})
export class JobVacancyRouting {}
