import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesRestateComponent } from './components';

const routes: Routes = [
  { path: '', component: SalesRestateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRestateRoutingModule { }
