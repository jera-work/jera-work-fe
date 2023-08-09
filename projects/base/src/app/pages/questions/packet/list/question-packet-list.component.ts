import { Component, OnInit } from '@angular/core';
import { QuestionPacketResDto } from '../../../../dto/question/question-packet.res.dto';
import { QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'question-packet',
  templateUrl: './question-packet-list.component.html',
})
export class QuestionPacketListComponent implements OnInit {
  questionsPacket: QuestionPacketResDto[] = [];

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService
      .getAllPacket()
      .subscribe((res) => (this.questionsPacket = res));
  }
}
