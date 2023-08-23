import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateAssignInsertReqDto } from 'src/app/dto/candidate/candidate-assign-insert.req.dto';
import { QuestionPacketResDto } from '../../dto/question/question-packet.res.dto';
import { QuestionTopicResDto } from '../../dto/question/question-topic.res.dto';
import { QuestionTypeResDto } from '../../dto/question/question-type.res.dto';
import { QuestionResDto } from '../../dto/question/question.res.dto';
import { UsersResDto } from '../../dto/user/users.res.dto';
import { AssignService } from '../../services/assign.service';
import { QuestionsService } from '../../services/questions.service';
import { UsersService } from '../../services/users.service';

const convertUTCToLocalDateTime = function (date: Date) {
  const newDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
  return newDate.toISOString();
};

@Component({
  selector: 'assign-candidate',
  templateUrl: 'assign-candidate.component.html',
})
export class AssignCandidateComponent implements OnInit, AfterViewChecked {
  candidates: UsersResDto[] = [];
  reviewers: UsersResDto[] = [];
  questionPacket: QuestionPacketResDto[] = [];
  questionTopic: QuestionTopicResDto[] = [];
  questionType: QuestionTypeResDto[] = [];
  questionList: QuestionResDto[] = [];

  questionsListId: number[] = [];

  typeName: string = '';

  candidateAssignListData: CandidateAssignInsertReqDto[] = [];

  assignsCandidate = this.fb.group({
    candidateAssignList: this.fb.array(this.candidateAssignListData),
    reviewerId: [0, [Validators.required]],
    candidateId: [0, [Validators.required]],
    questionId: this.fb.array(this.questionsListId),
  });

  constructor(
    private userService: UsersService,
    private questionService: QuestionsService,
    private assignService: AssignService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllCandidate()
      .subscribe((res) => (this.candidates = res));

    this.userService
      .getAllReviewer()
      .subscribe((res) => (this.reviewers = res));

    this.questionService
      .getAllPacket()
      .subscribe((res) => (this.questionPacket = res));

    this.questionService
      .getAllTopic()
      .subscribe((res) => (this.questionTopic = res));

    this.questionService
      .getAllType()
      .subscribe((res) => (this.questionType = res));

    this.questionService
      .getAllQuestions()
      .subscribe((res) => (this.questionList = res));
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  get candidateAssignList() {
    return this.assignsCandidate.get('candidateAssignList') as FormArray;
  }

  get questionId() {
    return this.assignsCandidate.get('questionId') as FormArray;
  }

  convertEndDate(e: any, i: number) {
    this.candidateAssignList.at(i).patchValue({
      endDate: new Date(convertUTCToLocalDateTime(e)),
    });
  }

  convertStartDate(e: any, i: number) {
    this.candidateAssignList.at(i).patchValue({
      startDate: new Date(convertUTCToLocalDateTime(e)),
    });
  }

  addAssignList(event: any, typeId: number) {
    if (typeId === 1) {
      this.typeName = 'Essay';
    } else {
      this.typeName = 'Option';
    }

    if (event.originalEvent.target.checked) {
      this.candidateAssignList.push(
        this.fb.group({
          questionTypeId: typeId,
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]],
          startDateTemp: ['', [Validators.required]],
          endDateTemp: ['', [Validators.required]],
        })
      );
    } else {
      const index = this.candidateAssignList.controls.findIndex(
        (x) => x.value === event.originalEvent.target.value
      );
      this.candidateAssignList.removeAt(index);
    }
  }

  
  addAssignLists(typeId: number) {
    this.candidateAssignList.push(
      this.fb.group({
        questionTypeId: typeId,
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
      })
    );
  }

  addQuestion() {
    this.questionId.push(this.fb.control(0));
  }

  removeQuestion(i: number) {
    this.questionId.removeAt(i);
  }

  onSubmit() {
    if (this.assignsCandidate.valid) {
      const data = this.assignsCandidate.getRawValue();
      this.assignService.assignCandidate(data).subscribe((res) => {
        this.router.navigateByUrl('/users');
      });
    }
  }
}
