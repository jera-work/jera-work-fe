import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewResDto } from '../../../dto/review/review.res.dto';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'review-list',
  templateUrl: './review-list.component.html',
})
export class ReviewListComponent implements OnInit {
  reviewList: ReviewResDto[] = [];

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit(): void {
    this.reviewService
      .getReviewByReviewerId()
      .subscribe((res) => (this.reviewList = res));
  }

  goDetails(candidateId: number) {
    this.router.navigateByUrl(`/reviews/detail/${candidateId}`);
  }

  getSeverity(status: string): string {
    if (status === 'recommended') {
      return 'success';
    } else if (status === 'considered') {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  getSeverityStatus(status: string): string {
    if (status === 'on progress') {
      return 'warning';
    } else if (status === 'submitted') {
      return 'success';
    } else {
      return 'danger';
    }
  }
}
