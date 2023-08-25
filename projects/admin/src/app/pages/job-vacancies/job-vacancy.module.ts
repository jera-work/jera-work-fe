import { NgModule } from '@angular/core';
import { JobVacancyRouting } from './job-vacancy.routing';

@NgModule({
  exports: [JobVacancyRouting],
  imports: [JobVacancyRouting],
})
export class JobVacancyModule {}
