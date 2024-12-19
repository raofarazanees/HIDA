import { MasteringModule } from './features/mastering/mastering.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { NoBusinessProcessComponent } from './shared/components/no-business-process/no-business-process.component';

import { AuthGuardClear } from './guards/auth-guard-clean.service';

export const appRoutes: Routes = [
  {
    path: 'manufacturer',
    loadChildren: () => import('./features/manufacturer/manufacturer.module').then((module) => module.ManufacturerModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Mastering Manufacturer' }
  },
  {
    path: 'facility-type',
    loadChildren: () => import('./features/facility-type/facility-type.module').then((module) => module.FacilityTypeModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Mastering FaciltyType' }
  },
  {
    path: 'item-master',
    loadChildren: () => import('./features/item-master/item-master.module').then((module) => module.ItemMasterModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Mastering ItemMaster' }
  },
  {
    path: 'sales-restate',
    loadChildren: () => import('./features/sales-restate/sales-restate.module').then((module) => module.SalesRestateModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Restating Sales' }
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./features/admin-dashboard/admin-dashboard.module').then((module) => module.AdminDashboardModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Admin Dashboard' }
  },
  {
    path: 'item-to-product',
    loadChildren: () => import('./features/item-to-product/item-to-product.module').then((module) => module.ItemToProductModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Item to Product' }
  },
  {
    path: 'product-brand',
    loadChildren: () => import('./features/item-to-product/item-to-product.module').then((module) => module.ItemToProductModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Item to Product' }
  },
  {
    path: 'product',
    loadChildren: () => import('./features/item-to-product/item-to-product.module').then((module) => module.ItemToProductModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Item to Product' }
  },
  {
    path: 'mastering',
    loadChildren: () => import('./features/mastering/mastering.module').then((module) => module.MasteringModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuardClear],
    data: { title: 'Data Masters' }
  },
  {
    path: 'broker/:authCode',
    loadChildren: () => import('./broker/broker.module').then((module) => module.BrokerModule)
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./unauthorized/unauthorized.module').then((module) => module.UnauthorizedModule)
  },
  {
    path: '**',
    redirectTo: 'unauthorized',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutesModule {}
