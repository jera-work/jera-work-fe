import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
import { SharedModule } from '@shared/shared.module';
import { HiredEmployeeComponent } from './hired-employees/hired-employees.component';
import { BlacklistEmployeesComponent } from './blacklist-employees/blacklist-employees.component';
import { TimeAgoPipe } from '@pipes/timeago.pipe';

const routes: Routes = [
  {
    path: 'hired',
    component: HiredEmployeeComponent,
  },
  {
    path: 'blacklist',
    component: BlacklistEmployeesComponent,
  },
];

@NgModule({
  declarations: [HiredEmployeeComponent, BlacklistEmployeesComponent],
  imports: [
    SharedModule,
    ButtonComponent,
    RouterModule.forChild(routes),
    TimeAgoPipe,
  ],
  exports: [RouterModule],
})
export class EmployeesRouting {}
