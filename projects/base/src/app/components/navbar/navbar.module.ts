import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from '@components/button/button.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [RouterModule, CommonModule, SharedModule, ButtonComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
