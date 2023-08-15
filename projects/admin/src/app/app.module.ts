import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouting,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
