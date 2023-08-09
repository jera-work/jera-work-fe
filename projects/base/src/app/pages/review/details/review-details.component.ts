import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateQuestionAndAnswerResDto } from 'src/app/dto/candidate/candidate-question-answer.res.dto';
import { ReviewDetailsResDto } from '../../../dto/review/review-details.res.dto';
import { ResultStatusResDto } from '../../../dto/status/result-status.res.dto';
import { QuestionsService } from '../../../services/questions.service';
import { ReviewDetailService } from '../../../services/review-detail.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'review-details',
  templateUrl: './review-details.component.html',
})
export class ReviewDetailsComponent implements OnInit, AfterViewChecked {
  candidateId!: number;
  reviewDetails!: ReviewDetailsResDto[];
  questionAndAnswers!: CandidateQuestionAndAnswerResDto[];
  reviewResult!: ResultStatusResDto[];

  reviewResDto = this.fb.group({
    candidateId: [this.candidateId, Validators.required],
    statusId: [2, Validators.required],
    resultId: [0, Validators.required],
    notes: ['', Validators.required],
    score: [0, Validators.required],
  });

  constructor(
    private reviewService: ReviewService,
    private reviewDetailService: ReviewDetailService,
    private questionService: QuestionsService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.reviewDetailService
        .getReviewDetailsbyCandidateId(Number(params.get('id')))
        .subscribe((res) => {
          console.log(res);
          this.reviewDetails = res;
        });
      this.reviewResDto = this.fb.group({
        candidateId: [Number(params.get('id')), Validators.required],
        statusId: [2, Validators.required],
        resultId: [0, Validators.required],
        notes: ['', Validators.required],
        score: [0, Validators.required],
      });
      this.questionService
        .getCandidateQuestionAndAnswer(Number(params.get('id')))
        .subscribe((res) => (this.questionAndAnswers = res));

      this.reviewService
        .getReviewResult()
        .subscribe((res) => (this.reviewResult = res));
    });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  onSubmit() {
    const data = this.reviewResDto.getRawValue();
    this.reviewService.updateReview(data).subscribe((res) => {
      this.router.navigateByUrl('/reviews');
    });
  }
}
