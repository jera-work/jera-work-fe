import { Component, OnInit } from '@angular/core'
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionAnswerInsertAnswerReqDto } from '@dto/question-answer/question-answer-insert-answer.req.dto';
import { QuestionOptionResDto } from '@dto/question-option/question-option.res.dto';
import { QuestionResDto } from '@dto/question/question.res.dto';
import { QuestionAnswerService } from '@services/question-answer.service';
import { QuestionsService } from '@services/questions.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector : 'question-answer',
    templateUrl : './question-answer.component.html'
})
export class QuestionAnswerComponent implements OnInit{

    loading = false
    visible = false

    question? : QuestionResDto
    option? : QuestionOptionResDto
    
    questions : QuestionResDto[] = []
    answerReqDto : QuestionAnswerInsertAnswerReqDto[] = []

    questionAnswerInsertReqDto = this.fb.group({
        answerReq: this.fb.array(this.answerReqDto)
    })

    constructor(
        private questionService : QuestionsService,
        private questionAnswerService : QuestionAnswerService,
        private fb : NonNullableFormBuilder,
        private router : Router,
        private title : Title,
        private route: ActivatedRoute
    ){
        this.title.setTitle('Asessment Test')
    }

    ngOnInit(): void {
        firstValueFrom(this.route.paramMap).then((res) => {
            const jobId = res.get('jobId')
            const assessmentId = res.get('assessmentId')
            const candidateCode = res.get('candidateCode')

            if(localStorage.getItem('candidateCode') == candidateCode){
                if(jobId){
                    firstValueFrom(this.questionService.getQuestions(jobId)).then((res) => {
                        this.questions = res
                        
                        for(let i = 0; i < this.questions.length; i++){
                            this.questionAnswerReq.push(this.fb.group({
                                jobVacancyId: [jobId],
                                assesmentVacancyId: [assessmentId],
                                questionId : [this.questions.at(i)?.id],
                                questionOptionId : [''],
                                [`questionOptionIdTemp${i}`] : ['']                
                        }))
                        }
                        console.log(res);
                    })
                } else {
                    this.router.navigateByUrl('/questions-answer/login')
                    localStorage.clear();
                }
            }
        })

        
    }

    get questionAnswerReq() {
        return this.questionAnswerInsertReqDto.get('answerReq') as FormArray
    }

    
    patchOption(event : any, i : number){
        this.questionAnswerReq.at(i).patchValue({
            questionOptionId : event.value
        })
    }

    showDialog(){
        this.visible = !this.visible
        console.log("tes")
    }

    submit(){
        console.log(this.questionAnswerInsertReqDto.get('answerReq')?.getRawValue())
        this.loading = true
        this.questionAnswerService.insertAnswer(this.questionAnswerInsertReqDto.get('answerReq')?.getRawValue()).subscribe(result => {
            localStorage.clear()
            this.router.navigateByUrl('/dashboard')
        })
    }
}

