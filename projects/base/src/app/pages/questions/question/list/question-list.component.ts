import { Component, OnInit } from '@angular/core';
import { QuestionListResDto } from '../../../../dto/question/question-list.res.dto';
import { QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
})
export class QuestionListComponent implements OnInit {
  questions: QuestionListResDto[] = [];

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService
      .getAllQuestionList()
      .subscribe((res) => (this.questions = res));
  }
}
