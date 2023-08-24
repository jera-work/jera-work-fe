import { RouterModule, Routes } from '@angular/router';
import { AppliedJobListComponent } from './applied-list/applied-job-list.component';
import { AppliedJobDetailsComponent } from './applied-details/applied-job-details.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';
import { JobCardComponent } from '@components/job-card/job-card.component';
import { UrlPipeAdmin } from '@pipes/url.pipe';
import { TimeAgoPipe } from '@pipes/timeago.pipe';

const routes: Routes = [
  {
    path: '',
    component: AppliedJobListComponent,
  },
  {
    path: ':id',
    component: AppliedJobDetailsComponent,
  },
];

@NgModule({
  declarations: [AppliedJobListComponent, AppliedJobDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ButtonComponent,
    JobCardComponent,
    UrlPipeAdmin,
    TimeAgoPipe
  ],
  exports: [RouterModule],
})
export class AppliedJobRouting {}
