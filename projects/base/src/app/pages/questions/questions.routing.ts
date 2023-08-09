import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuestionListComponent } from './question/list/question-list.component';
import { QuestionCreateComponent } from './question/create/question-create.component';
import { QuestionTopicListComponent } from './topic/list/question-topic-list.component';
import { QuestionTopicCreateComponent } from './topic/create/question-topic-create.component';
import { QuestionPacketListComponent } from './packet/list/question-packet-list.component';
import { QuestionPacketCreateComponent } from './packet/create/question-packet-create.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent,
  },
  {
    path: 'create',
    component: QuestionCreateComponent,
  },
  {
    path: 'topic',
    component: QuestionTopicListComponent,
  },
  {
    path: 'topic/create',
    component: QuestionTopicCreateComponent,
  },
  {
    path: 'packet',
    component: QuestionPacketListComponent,
  },
  {
    path: 'packet/create',
    component: QuestionPacketCreateComponent,
  },
];

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionCreateComponent,
    QuestionTopicListComponent,
    QuestionTopicCreateComponent,
    QuestionPacketListComponent,
    QuestionPacketCreateComponent,
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
export class QuestionsRouting {}
