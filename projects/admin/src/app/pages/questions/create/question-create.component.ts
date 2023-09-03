import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionOptionInsertReqDto } from '@dto/question-option/question-option-insert.dto';
import { QuestionInsertQuestionReqDto } from '@dto/question/question-insert-question.req.dto';
import { QuestionsService } from '@services/questions.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'question-create',
  templateUrl: './question-create.component.html',
})
export class QuestionCreateComponent implements OnInit, AfterViewChecked {
  loading = false;
  jobId!: string | null;

  options = [
    { label: 'True', value: true },
    { label: 'False', value: false },
  ];

  questionInsertQuestionReqDto: QuestionInsertQuestionReqDto[] = [];
  questionOptionInsertReqDto: QuestionOptionInsertReqDto[] = [];

  questionInsertReqDto = this.fb.group({
    questionsReq: this.fb.array(this.questionInsertQuestionReqDto),
  });

  constructor(
    private questionService: QuestionsService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.title.setTitle('Question | Create');
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    firstValueFrom(this.route.paramMap).then((res) => {
      this.jobId = res.get('jobId');
    });
  }

  get questionsReq() {
    return this.questionInsertReqDto.get('questionsReq') as FormArray;
  }

  questionOptionInsertReq(i: number) {
    return this.questionsReq.at(i).get('options') as FormArray;
  }

  addQuestion() {
    this.questionsReq.push(
      this.fb.group({
        jobVacancyId: [this.jobId],
        questionCode: ['', Validators.required],
        questionBody: ['', Validators.required],
        options: this.fb.array(this.questionOptionInsertReqDto),
      })
    );
  }

  addOption(i: number) {
    this.questionOptionInsertReq(i).push(
      this.fb.group({
        optionLabel: ['', Validators.required],
        isCorrect: ['', Validators.required],
      })
    );
    this.ngAfterViewChecked();
  }

  removeAnswerOption(questionIndex: number, optionIndex: number) {
    this.questionOptionInsertReq(questionIndex).removeAt(optionIndex);
  }

  removeQuestion(i: number) {
    this.questionsReq.removeAt(i);
  }

  submit(): void {
    // console.log(this.questionInsertReqDto.get('questionsReq')?.getRawValue())
    if (this.questionsReq.valid) {
      this.loading = true;
      this.questionService
        .insertQuestion(
          this.questionInsertReqDto.get('questionsReq')?.getRawValue()
        )
        .subscribe((result) => {
          this.loading = false;
          this.router.navigateByUrl(`/questions/${this.jobId}`);
        });
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please complete the data requirements!',
      });
    }
  }
}
