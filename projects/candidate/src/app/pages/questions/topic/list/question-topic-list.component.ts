import { Component, OnInit } from '@angular/core';
import { QuestionTopicResDto } from '../../../../dto/question/question-topic.res.dto';
import { QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'question-topic',
  templateUrl: './question-topic-list.component.html',
})
export class QuestionTopicListComponent implements OnInit {
  questionsTopic: QuestionTopicResDto[] = [];

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService
      .getAllTopic()
      .subscribe((res) => (this.questionsTopic = res));
  }
}
