import { NgModule } from '@angular/core';
import { JobDetailsRouting } from './job-details.routing';

@NgModule({
  imports: [JobDetailsRouting],
  exports: [JobDetailsRouting],
})
export class JobDetailsModule {}
