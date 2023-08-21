import { Pipe, PipeTransform } from '@angular/core';
import { ADMIN_API, CANDIDATE_API } from '../constant/api.constant';

@Pipe({
  name: 'urlCandidate',
  standalone: true,
})
export class UrlPipeCandidate implements PipeTransform {
  transform(value: any): string {
    if (value !== undefined) {
      return `${CANDIDATE_API}/files/${value}`;
    } else {
      return '/assets/default.png';
    }
  }
}

@Pipe({
  name: 'url-admin',
  standalone: true,
})
export class UrlPipeAdmin implements PipeTransform {
  transform(value: any): string {
    if (value !== undefined) {
      return `${ADMIN_API}/files/${value}`;
    } else {
      return '/assets/default.png';
    }
  }
}
