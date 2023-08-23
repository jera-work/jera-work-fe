import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FilesInsertReqDto } from '../dto/files/files-insert.req.dto';
import { Observable } from 'rxjs';
import { InsertResDto } from '../dto/InsertResDto';
import { BASE_URL } from '../constant/api.constant';
import { FilesCandidateRes } from '../dto/files/files-candidate.res.dto';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private base: BaseService) {}

  insert(data: FilesInsertReqDto): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/files`, data);
  }

  getFilesCandidateType(): Observable<FilesCandidateRes[]> {
    return this.base.get(`${BASE_URL}/files/types`);
  }

  
}
