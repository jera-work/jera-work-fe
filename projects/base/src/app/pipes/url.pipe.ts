import { Pipe, PipeTransform } from '@angular/core';
import { ADMIN_API } from '../constant/api.constant';

@Pipe({
  name: 'url',
  standalone: true,
})
export class UrlPipe implements PipeTransform {
  transform(value: any): string {
    return `${ADMIN_API}/files/${value}`;
  }
}
