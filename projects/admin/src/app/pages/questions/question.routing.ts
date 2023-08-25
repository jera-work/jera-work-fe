import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { QuestionCreateComponent } from "./create/question-create.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { SharedModule } from "@shared/shared.module";
import { ButtonComponent } from "@components/button/button.component";

const routes : Routes = [
    {
        path : 'create',
        component : QuestionCreateComponent
    }
]

@NgModule({
    declarations : [
        QuestionCreateComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        InputTextareaModule,
        DropdownModule,
        CardModule,
        SharedModule,
        ButtonComponent
    ],
    exports : [
        QuestionCreateComponent
    ]
})
export class QuestionRouting{

}