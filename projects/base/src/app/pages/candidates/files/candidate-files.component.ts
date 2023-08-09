import { Component, OnInit } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilesType } from '../../../constant/file-type.constant';
import { FilesCandidateInsertReqDto } from '../../../dto/files/files-candidate-insert.req.dto';
import { AnswerService } from '../../../services/answer.service';
import { FilesCandidateRes } from 'src/app/dto/files/files-candidate.res.dto';
import { FileService } from 'src/app/services/file.service';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'candidate-files',
  templateUrl: './candidate-files.component.html',
  providers: [MessageService],
})
export class CandidateFilesComponent implements OnInit {
  filesCandidateInsertReqDto: FilesCandidateInsertReqDto[] = [];

  filesCandidateTypes!: FilesCandidateRes[];
  filesCandidateInsert = this.fb.group({
    data: this.fb.array(this.filesCandidateInsertReqDto),
  });

  get filesCandidate() {
    return this.filesCandidateInsert.get('data') as FormArray;
  }

  constructor(
    private answerService: AnswerService,
    private fileService: FileService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fileService.getFilesCandidateType().subscribe((res) => {
      this.filesCandidateTypes = res;
      console.log(res);

      for (let f of res) {
        this.filesCandidate.push(
          this.fb.group({
            typeId: [f.id, Validators.required],
            fileExtens: ['', Validators.required],
            fileName: ['', Validators.required],
          })
        );
      }
    });
  }

  fileUpload(event: any, id: number, index: number) {
    console.log(event);

    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });

    for (let file of event.files) {
      toBase64(file).then((result) => {
        const resultBase64 = result.substring(
          result.indexOf(',') + 1,
          result.length
        );
        const resultExtension = file.name.substring(
          file.name.indexOf('.') + 1,
          file.name.length
        );

        this.filesCandidate.at(index).setValue({
          typeId: id,
          fileExtens: resultExtension,
          fileName: resultBase64,
        });
      });
    }
  }

  onSubmit() {
    if (this.filesCandidate.valid) {
      const data = this.filesCandidateInsert.getRawValue().data;
      this.answerService.insertFiles(data).subscribe((res) => {
        this.router.navigateByUrl('/candidates/start-answer');
      });
    } else {
      console.log('Invalid submit candidate informations');
    }
  }
}
