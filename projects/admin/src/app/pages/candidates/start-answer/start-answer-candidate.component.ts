import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressStatus } from '../../../constant/progress.constant';
import { AnswerService } from '../../../services/answer.service';
import { CandidateStartDatesResDto } from 'src/app/dto/candidate/candidate-start-dates.res.dto';
import { CandidateQuestionTotalResDto } from 'src/app/dto/candidate/candidate-question-total.res.dto';

@Component({
  selector: 'candidate-start-answer',
  templateUrl: 'start-answer-candidate.component..html',
})
export class StartAnswerComponent implements OnInit {
  dates?: CandidateStartDatesResDto;
  totalQuestion?: CandidateQuestionTotalResDto;

  constructor(
    private answerService: AnswerService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.answerService.getAllQuestion().subscribe((res) => {
      this.totalQuestion = res;
    });

    this.answerService.getDates().subscribe((res) => (this.dates = res));
  }

  data = Object.values(JSON.parse(localStorage.getItem('data') || '{}'));

  startAnswer = this.fb.group({
    candidateId: Number(this.data[0]),
    statusId: ProgressStatus.ON_PROGRESS,
    resultId: null,
    notes: null,
    score: null,
  });

  onClick() {
    this.answerService
      .startAnswer(this.startAnswer.getRawValue())
      .subscribe((res) =>
        this.router.navigateByUrl('/candidates/answer-question')
      );
  }
}
