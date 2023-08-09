import { NgModule } from '@angular/core';
import { QuestionsRouting } from './questions.routing';

@NgModule({
  imports: [QuestionsRouting],
  exports: [QuestionsRouting],
})
export class QuestionModules {}
