import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { UnauthorizedComponent } from './unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized.routes';

@NgModule({
  imports: [SharedModule, UnauthorizedRoutingModule],
  declarations: [UnauthorizedComponent],
  exports: [UnauthorizedComponent]
})
export class UnauthorizedModule {}
