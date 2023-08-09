import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CandidateFilesComponent } from './files/candidate-files.component';
import { StartAnswerComponent } from './start-answer/start-answer-candidate.component';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from 'src/app/components/button/button.component';

const routes: Routes = [
  {
    path: 'files',
    component: CandidateFilesComponent,
  },
  {
    path: 'start-answer',
    component: StartAnswerComponent,
  },
  {
    path: 'answer-question',
    component: AnswerQuestionComponent,
  },
];

@NgModule({
  declarations: [
    CandidateFilesComponent,
    AnswerQuestionComponent,
    StartAnswerComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonComponent,
  ],
  exports: [RouterModule],
})
export class CandidatesRouting {}
