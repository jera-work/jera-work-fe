import { NgModule } from '@angular/core';
import { UserRouting } from './user.routing';

@NgModule({
  imports: [UserRouting],
  exports: [UserRouting],
})
export class UserModule {}
