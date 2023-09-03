import { NgModule } from '@angular/core';
import { CompanyRouting } from './company.routing';

@NgModule({
  exports: [CompanyRouting],
  imports: [CompanyRouting],
})
export class CompanyModule {}
