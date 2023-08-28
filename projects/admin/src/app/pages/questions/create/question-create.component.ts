import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { QuestionOptionInsertReqDto } from "@dto/question-option/question-option-insert.dto";
import { QuestionInsertQuestionReqDto } from "@dto/question/question-insert-question.req.dto";
import { QuestionsService } from "@services/questions.service";

@Component({
    selector: 'question-create',
    templateUrl: './question-create.component.html'
})
export class QuestionCreateComponent implements OnInit, AfterViewChecked {

    loading = false

    options = [
        { label : 'True', value : true },
        { label : 'False', value : false }
    ]
    
    questionInsertQuestionReqDto : QuestionInsertQuestionReqDto[] = []
    questionOptionInsertReqDto : QuestionOptionInsertReqDto[] = []

    questionInsertReqDto = this.fb.group({
        questionsReq: this.fb.array(this.questionInsertQuestionReqDto)
    })
    
    constructor(
        private questionService: QuestionsService,
        private fb: NonNullableFormBuilder,
        private router : Router,
        private title : Title,
        private cd : ChangeDetectorRef

    ) { 
        this.title.setTitle('Question | Create')
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    ngOnInit(): void {
    }

    get questionsReq() {
        return this.questionInsertReqDto.get('questionsReq') as FormArray
    }

    questionOptionInsertReq(i: number) {
        return this.questionsReq.at(i).get('options') as FormArray
    }

    addQuestion() {
        // JOB VACANCY ID DIAMBIL DARI ROUTERLINK
        this.questionsReq.push(this.fb.group({
            jobVacancyId : ['ef1f048e-f3eb-4899-94e2-356fe70e548f'],
            questionCode : ['', Validators.required],
            questionBody : ['', Validators.required],
            options : this.fb.array(this.questionOptionInsertReqDto)
        }))
    }

    addOption(i : number) {
        this.questionOptionInsertReq(i).push(this.fb.group({
            optionLabel : ['', Validators.required],
	        isCorrect : ['', Validators.required]
        }))
        this.ngAfterViewChecked()
    }
   

    removeAnswerOption(questionIndex: number, optionIndex: number) {
        this.questionOptionInsertReq(questionIndex).removeAt(optionIndex)
    }

    removeQuestion(i: number) {
        this.questionsReq.removeAt(i)
    }

    submit(): void {
        // console.log(this.questionInsertReqDto.get('questionsReq')?.getRawValue())
        if(this.questionInsertReqDto.valid){
            this.loading = true
            this.questionService.insertQuestion(this.questionInsertReqDto.get('questionsReq')?.getRawValue()).subscribe(result => {
                this.loading = false
                this.router.navigateByUrl('/questions')
            })
        }
    }
}