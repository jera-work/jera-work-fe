import { NgModule } from '@angular/core';
import { NavbarModule } from '../navbar/navbar.module';
import { BaseComponent } from './base.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { NotFoundModule } from '@components/not-found/not-found.module';

@NgModule({
  declarations: [BaseComponent],
  imports: [NavbarModule, RouterModule, FooterComponent, NotFoundModule],
  // exports: [BaseComponent],
})
export class BaseModule {}
