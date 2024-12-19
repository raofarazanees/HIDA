import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityTypeComponent } from './components';

const routes: Routes = [
  { path: '', component: FacilityTypeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityTypeRoutingModule { }
