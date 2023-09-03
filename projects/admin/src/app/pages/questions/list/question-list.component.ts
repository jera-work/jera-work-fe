import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionResDto } from '@dto/question/question.res.dto';
import { QuestionsService } from '@services/questions.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
})
export class QuestionListComponent implements OnInit, AfterViewChecked {
  questions: QuestionResDto[] = [];
  jobId!: string | null;
  constructor(
    private questionService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngAfterViewChecked(): void {
    // throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    firstValueFrom(this.route.paramMap).then((res) => {
      this.jobId = res.get('jobId');
      if (this.jobId) {
        firstValueFrom(this.questionService.getQuestions(this.jobId)).then(
          (res) => {
            this.questions = res;
          }
        );
      }
    });
  }
}
