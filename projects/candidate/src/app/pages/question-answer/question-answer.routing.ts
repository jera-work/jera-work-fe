import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { QuestionAnswerComponent } from "./answer/question-answer.component"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"

import { CardModule } from "primeng/card"
import { ButtonModule } from "primeng/button"
import { InputTextareaModule } from "primeng/inputtextarea"
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from "primeng/dialog"
import { SharedModule } from "@shared/shared.module"
import { LoginQuestionAnswerComponent } from "./login-for-question-answer/login-answer.component"
import { ButtonComponent } from "@components/button/button.component"

const routes: Routes = [
    {
        path: ':jobId/:assessmentId/:candidateCode',
        component: QuestionAnswerComponent

    },
    {
        path: "login/:jobId/:assessmentId/:candidateCode",
        component: LoginQuestionAnswerComponent
    }
]

@NgModule({
    declarations: [
        QuestionAnswerComponent,
        LoginQuestionAnswerComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        ButtonModule,
        InputTextareaModule,
        RadioButtonModule,
        CardModule,
        DialogModule,
        SharedModule,
        ButtonComponent
    ],
    exports: [
        RouterModule,
        QuestionAnswerComponent,
        LoginQuestionAnswerComponent
    ]
})
export class QuestionAnswerRouting {

}