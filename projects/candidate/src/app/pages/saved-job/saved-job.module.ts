import { NgModule } from '@angular/core';
import { SavedJobRouting } from './saved-job.routing';

@NgModule({
  imports: [SavedJobRouting],
  exports: [SavedJobRouting],
})
export class SavedJobModule {}
