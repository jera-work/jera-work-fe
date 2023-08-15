import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { EditorModule } from 'primeng/editor';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    MenubarModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    OverlayPanelModule,
    MenuModule,
    ImageModule,
    DialogModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule,
    InputNumberModule,
    FileUploadModule,
    TooltipModule,
    StepsModule,
    InputTextareaModule,
    CardModule,
    FormsModule,
    CarouselModule,
    EditorModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  exports: [
    MenubarModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    OverlayPanelModule,
    MenuModule,
    ImageModule,
    DialogModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule,
    InputNumberModule,
    FileUploadModule,
    TooltipModule,
    StepsModule,
    InputTextareaModule,
    CardModule,
    FormsModule,
    CarouselModule,
    EditorModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
})
export class SharedModule {}
