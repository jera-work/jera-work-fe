import { NgModule } from '@angular/core';
import { EmployeesRouting } from './employees.routing';

@NgModule({
  imports: [EmployeesRouting],
  exports: [EmployeesRouting],
})
export class EmployeesModule {}
