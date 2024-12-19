import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { BrokerComponent } from './broker.component';
import { BrokerRoutingModule } from './broker.routes';

@NgModule({
  imports: [SharedModule, BrokerRoutingModule],
  declarations: [BrokerComponent],
  exports: [BrokerComponent]
})
export class BrokerModule {}
