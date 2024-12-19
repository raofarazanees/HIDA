import { StagingCurationFinalReviewComponent } from './components/for-product-staging-curation/staging-curation-final-review/staging-curation-final-review.component';
import { ForProductStagingCurationComponent } from './components/for-product-staging-curation/for-product-staging-curation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemToProductComponent } from './components/item-to-product.component';
import { ForPairingI2PComponent } from './components/for-pairing/for-pairing-i2p.component';
import { ForLabellingI2PComponent } from './components/for-labelling/for-labelling-i2p.component';
import { GraphsI2PComponent } from './components/graphs/graphs-i2p.component';
import { NoPermissionComponent } from './components/no-permission/no-permission.component';
import { ForItemPairsConfirmationComponent } from './components/for-item-pairs-confirmation/for-item-pairs-confirmation.component';
import { ProductBrandMappingComponent } from './components/product-brand-mapping/product-brand-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: ItemToProductComponent,
    children: [
      { path: 'pairing', component: ForPairingI2PComponent },
      { path: 'labeling', component: ForLabellingI2PComponent },
      { path: 'item-pair-confirmation', component: ForItemPairsConfirmationComponent },
      { path: 'graph-confirmation', component: GraphsI2PComponent },
      { path: 'mapping', component: ProductBrandMappingComponent },
      { path: 'staging-curation/for-labelling', component: ForProductStagingCurationComponent },
      { path: 'staging-curation/with-labels', component: ForProductStagingCurationComponent },
      { path: 'staging-curation/final-confirmation', component: StagingCurationFinalReviewComponent },
      { path: '**', component: NoPermissionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemToProductRoutingModule {}
