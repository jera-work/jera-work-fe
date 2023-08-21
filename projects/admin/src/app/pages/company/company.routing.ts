import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./list/company-list.component";
import { CompanyCreateComponent } from "./create/company-create.component";
import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
      path: '',
      component: CompanyListComponent,
    },
    {
      path: 'create',
      component: CompanyCreateComponent,
    }
];

@NgModule({
    declarations: [
        CompanyListComponent,
        CompanyCreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule,
        TableModule,
        CardModule,
        DropdownModule,
        FileUploadModule,
        InputTextModule,
        InputTextareaModule
    ],
    exports: [RouterModule]
})
export class CompanyRouting{

}