import { NgModule } from '@angular/core';

import { CandidatesRouting } from './candidates.routing';

@NgModule({
  imports: [CandidatesRouting],
  exports: [CandidatesRouting],
})
export class CandidatesModules {}
