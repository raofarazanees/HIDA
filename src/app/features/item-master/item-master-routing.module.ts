import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemMasterComponent } from './components';

const routes: Routes = [{ path: '', component: ItemMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemMasterRoutingModule {}
