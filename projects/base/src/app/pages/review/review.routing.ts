import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewListComponent } from './list/review-list.component';
import { ReviewDetailsComponent } from './details/review-details.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from 'src/app/components/button/button.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewListComponent,
  },
  {
    path: 'detail/:id',
    component: ReviewDetailsComponent,
  },
];

@NgModule({
  declarations: [ReviewListComponent, ReviewDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonComponent,
  ],
  exports: [RouterModule],
})
export class ReviewRouting {}
