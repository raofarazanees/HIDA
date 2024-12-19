import { TaskEscalatedDialogComponent } from './for-product-staging-curation/task-escalated-dialog/task-escalated-dialog.component';
import { StagingProductItemsViewDialogComponent } from './for-product-staging-curation/staging-product-items-view-dialog/staging-product-items-view-dialog.component';
import { ForProductStagingCurationComponent } from './for-product-staging-curation/for-product-staging-curation.component';
import { ItemToProductComponent } from './item-to-product.component';
import { ForPairingI2PComponent } from './for-pairing/for-pairing-i2p.component';
import { ForLabellingI2PComponent } from './for-labelling/for-labelling-i2p.component';
import { ForItemPairsConfirmationComponent } from './for-item-pairs-confirmation/for-item-pairs-confirmation.component';
import { GraphsI2PComponent } from './graphs/graphs-i2p.component';
import { NoPermissionComponent } from './no-permission/no-permission.component';

import { columnRenderercomponents } from './column-renderers';
import { GraphProductItemsDialogComponent } from './graphs/graph-product-items-dialog/graph-product-items-dialog.component';
import { ItemtopairActionCommentDialogComponent } from './for-item-pairs-confirmation/itemtopair-action-comment-dialog/itemtopair-action-comment-dialog.component';
import { ProductBrandMappingComponent } from './product-brand-mapping/product-brand-mapping.component';
import { StagingCurationFinalReviewComponent } from './for-product-staging-curation/staging-curation-final-review/staging-curation-final-review.component';

export const components = [
  ...columnRenderercomponents,
  ItemToProductComponent,
  ForPairingI2PComponent,
  ForLabellingI2PComponent,
  ForItemPairsConfirmationComponent,
  GraphsI2PComponent,
  NoPermissionComponent,
  ItemtopairActionCommentDialogComponent,
  GraphProductItemsDialogComponent,
  ItemtopairActionCommentDialogComponent,
  ProductBrandMappingComponent,
  ForProductStagingCurationComponent,
  StagingProductItemsViewDialogComponent,
  TaskEscalatedDialogComponent,
  StagingCurationFinalReviewComponent
];
