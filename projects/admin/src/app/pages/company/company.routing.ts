import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './list/company-list.component';
import { CompanyCreateComponent } from './create/company-create.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';
import { UrlPipeAdmin } from '@pipes/url.pipe';

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
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ButtonComponent,
    UrlPipeAdmin,
  ],
  exports: [RouterModule],
})
export class CompanyRouting {}
