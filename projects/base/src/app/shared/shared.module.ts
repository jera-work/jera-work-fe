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
  ],
})
export class SharedModule {}
