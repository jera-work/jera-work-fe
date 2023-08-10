import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './job-details.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: ':id',
    component: JobDetailsComponent,
  },
];

@NgModule({
  declarations: [JobDetailsComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class JobDetailsRouting {}
