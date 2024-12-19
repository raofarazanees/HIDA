import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManufactureMasterSearchComponent } from './components/manufacture-master-search/manufacture-master-search.component';
import { ToolsFilterBaseComponent } from './mastering-root/tools-filter-base.component';
import { UnspscMasterComponent } from './components/unspsc-master/unspsc-master.component';
import { ZipMasterComponent } from './components/zip-master/zip-master.component';
import { MarketMasterComponent } from './components/market-master/market-master.component';
import { FacilityRootComponent } from './components/facility-master/facility-root/facility-root.component';
import { ProductEntitlementManagementComponent } from './components/product-entitlement-management/product-entitlement-management.component';
import { BrandRootComponent } from './components/brand-master/brand-root/brand-root.component';

const routes: Routes = [
  {
    path: '',
    component: ToolsFilterBaseComponent,
    children: [
      { path: 'manufacturer-master', component: ManufactureMasterSearchComponent },
      { path: 'unspsc-master', component: UnspscMasterComponent },
      { path: 'market-master', component: MarketMasterComponent },
      { path: 'facility-master', component: FacilityRootComponent },
      { path: 'product-entitlement', component: ProductEntitlementManagementComponent },
      { path: 'brand-master', component: BrandRootComponent },
      { path: 'zip-master', component: ZipMasterComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasteringRoutingModule {}
