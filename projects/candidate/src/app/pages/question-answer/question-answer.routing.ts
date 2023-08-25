import { NgModule } from "@angular/core"
import { Routes , RouterModule} from "@angular/router"
import { QuestionAnswerComponent } from "./answer/question-answer.component"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"

import { CardModule } from "primeng/card"
import { ButtonModule } from "primeng/button"
import { InputTextareaModule } from "primeng/inputtextarea"
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from "primeng/dialog"
import { SharedModule } from "@shared/shared.module"

const routes: Routes = [
    {
        path : '',
        component : QuestionAnswerComponent
    }
]

@NgModule({
    declarations : [
        QuestionAnswerComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        ButtonModule,
        InputTextareaModule,
        RadioButtonModule,
        CardModule,
        DialogModule,
        SharedModule
    ],
    exports : [
        RouterModule,
        QuestionAnswerComponent
    ]
})
export class QuestionAnswerRouting{

}