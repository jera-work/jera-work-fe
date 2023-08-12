import { RouterModule, Routes } from '@angular/router';
import { SavedJobListComponent } from './saved-list/saved-job-list.component';
import { SavedJobDetailsComponent } from './saved-details/saved-job-details.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';

const routes: Routes = [
  {
    path: '',
    component: SavedJobListComponent,
  },
  {
    path: ':id',
    component: SavedJobDetailsComponent,
  },
];

@NgModule({
  declarations: [SavedJobListComponent, SavedJobDetailsComponent],
  imports: [RouterModule.forChild(routes), SharedModule, ButtonComponent],
  exports: [RouterModule],
})
export class SavedJobRouting {}
