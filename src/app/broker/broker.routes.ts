import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrokerComponent } from './broker.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
