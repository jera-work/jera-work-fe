import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ReviewDetailsResDto } from '../dto/review/review-details.res.dto';
import { BASE_URL } from '../constant/api.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewDetailService {
  constructor(private base: BaseService) {}

  getReviewDetailsbyCandidateId(id: number): Observable<ReviewDetailsResDto[]> {
    return this.base.get(`${BASE_URL}/review/details/?id=${id}`);
  }
}
