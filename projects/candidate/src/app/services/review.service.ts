import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewResDto } from '../dto/review/review.res.dto';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { ReviewUpdateReqDto } from '../dto/review/review-update.req.dto';
import { ResultStatusResDto } from '../dto/status/result-status.res.dto';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private base: BaseService) {}

  getReviewByReviewerId(): Observable<ReviewResDto[]> {
    return this.base.get(`${BASE_URL}/review/reviewer`);
  }

  getReviewById(id: number): Observable<ReviewResDto> {
    return this.base.get(`${BASE_URL}/review`);
  }

  updateReview(data: ReviewUpdateReqDto) {
    return this.base.patch(`${BASE_URL}/review/update`, data);
  }

  getReviewResult(): Observable<ResultStatusResDto[]> {
    return this.base.get(`${BASE_URL}/review/result`);
  }
}
