import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'question-topic-create',
  templateUrl: './question-topic-create.component.html',
})
export class QuestionTopicCreateComponent {
  questionTopicInsertReqDto = this.fb.group({
    topicName: ['',Validators.required],
    topicCode: ['',Validators.required],
  });

  constructor(
    private questionService: QuestionsService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  onCreate() {
    if (this.questionTopicInsertReqDto.valid) {
      const data = this.questionTopicInsertReqDto.getRawValue();
      this.questionService.insertQuestionTopic(data).subscribe((res) => {
        console.log('Success create question topic');
        this.router.navigateByUrl('/questions/topic');
      });
    }
  }
}
