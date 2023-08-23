import { Component, OnInit } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionInsertReqDto } from '../../../../dto/question/question-insert.req.dto';
import { QuestionOptionInsertReqDto } from '../../../../dto/question/question-option-insert.req.dto';
import { QuestionPacketResDto } from '../../../../dto/question/question-packet.res.dto';
import { QuestionTopicResDto } from '../../../../dto/question/question-topic.res.dto';
import { QuestionTypeResDto } from '../../../../dto/question/question-type.res.dto';
import { QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'question-create',
  templateUrl: './question-create.component.html',
})
export class QuestionCreateComponent implements OnInit {
  questionsPacket: QuestionPacketResDto[] = [];
  questionsTopic: QuestionTopicResDto[] = [];
  questionsType: QuestionTypeResDto[] = [];

  questionOptionInsertReqDto: QuestionOptionInsertReqDto[] = [];
  questionInsertReqDtoArr: QuestionInsertReqDto[] = [];
  questionOptionValue = [
    {
      id: 'true',
      value: 'True',
    },
    {
      id: 'false',
      value: 'False',
    },
  ];

  questionInsertReqDto = this.fb.group({
    data: this.fb.array(this.questionInsertReqDtoArr),
  });

  constructor(
    private questionsService: QuestionsService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionsService
      .getAllPacket()
      .subscribe((res) => (this.questionsPacket = res));

    this.questionsService
      .getAllTopic()
      .subscribe((res) => (this.questionsTopic = res));

    this.questionsService
      .getAllType()
      .subscribe((res) => (this.questionsType = res));
  }

  get data() {
    return this.questionInsertReqDto.get('data') as FormArray;
  }

  onAddQuestion() {
    console.log(this.questionsPacket);

    this.data.push(
      this.fb.group({
        question: ['', [Validators.required]],
        questionCode: ['', [Validators.required]],
        topicId: [0, [Validators.required]],
        packetId: [0, [Validators.required]],
        typeId: [0, [Validators.required]],
        questionOption: this.fb.array(this.questionOptionInsertReqDto),
      })
    );
  }

  onRemoveQuestion(i: number) {
    this.data.removeAt(i);
  }

  questionOption(questionId: number) {
    return this.data.at(questionId).get('questionOption') as FormArray;
  }

  onAddOption(questionId: number) {
    this.questionOption(questionId).push(
      this.fb.group({
        optionLabel: ['', [Validators.required]],
        optionCorrect: ['', [Validators.required]],
      })
    );
  }

  onRemoveOption(questionId: number, optionId: number) {
    this.questionOption(questionId).removeAt(optionId);
  }

  onSubmit() {
    if (this.questionInsertReqDto.valid) {
      const data = this.questionInsertReqDto.getRawValue().data;
      this.questionsService.insertQuestion(data).subscribe((res) => {
        this.router.navigateByUrl('/questions');
      });
    }
  }
}
