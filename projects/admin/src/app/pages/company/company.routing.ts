import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './list/company-list.component';
import { CompanyCreateComponent } from './create/company-create.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
  },
  {
    path: 'create',
    component: CompanyCreateComponent,
  },
];

@NgModule({
  declarations: [CompanyListComponent, CompanyCreateComponent],
  imports: [RouterModule.forChild(routes), SharedModule, ButtonComponent],
  exports: [RouterModule],
})
export class CompanyRouting {}
