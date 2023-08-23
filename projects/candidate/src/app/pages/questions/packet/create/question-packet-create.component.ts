import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'question-packet-create',
  templateUrl: './question-packet-create.component.html',
})
export class QuestionPacketCreateComponent {
  loading?: boolean;

  questionPacketInsertReqDto = this.fb.group({
    packetQuestionName: ['', Validators.required],
    packetQuestionCode: ['', Validators.required],
  });

  constructor(
    private questionsService: QuestionsService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  onCreate() {
    if (this.questionPacketInsertReqDto.valid) {
      this.loading = true;
      const data = this.questionPacketInsertReqDto.getRawValue();
      this.questionsService.insertQuestionPacket(data).subscribe((res) => {
        console.log('Successfully create question packet');
        this.loading = false;
        this.router.navigateByUrl('/questions/packet');
      });
    } else {
      console.log('Error');
      this.loading = false;
    }
  }
}
