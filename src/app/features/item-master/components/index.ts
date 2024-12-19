import { MasteredComponent } from './mastered/mastered.component';
import { UnmasteredComponent } from './unmastered/unmastered.component';
import { ItemMasterComponent } from './item-master.component';
import { EditComponent } from './mastered/edit/edit.component';
import { LogDialogComponent } from './mastered/log-dialog/log-dialog.component';
import { DetailsComponent } from './mastered/details/details.component';
import { SubmissionDialogComponent } from './unmastered/submission-dialog/submission-dialog.component';

import { UnspscColumnRendererComponent } from './unspsc-selection/aggrid-column-renderer/unspsc-column-renderer.component';
import { UnspscTableviewComponent } from './unspsc-selection/table-view/unspsc-tableview.component';
import { UnspscTreeviewComponent } from './unspsc-selection/tree-view/unspsc-treeview.component';
import { UnspscSelectionComponent } from './unspsc-selection/unspsc-selection.component';
import { UnspscRendererComponent } from './mastered/edit/unspsc-renderer/unspsc-renderer.component';
import { RejectColumnRendererComponent } from './unmastered/reject-column-renderer/reject-column-renderer.component';
import { RejectLogComponent } from './unmastered/reject-log/reject-log.component';
import { AttributeExtensionColumnRendererComponent } from './attribute-extension-renderer/attribute-extension-renderer.component';

export const components = [
  MasteredComponent,
  UnmasteredComponent,
  ItemMasterComponent,
  EditComponent,
  LogDialogComponent,
  DetailsComponent,
  UnspscColumnRendererComponent,
  UnspscTableviewComponent,
  UnspscTreeviewComponent,
  UnspscSelectionComponent,
  UnspscRendererComponent,
  SubmissionDialogComponent,
  RejectColumnRendererComponent,
  RejectLogComponent,
  AttributeExtensionColumnRendererComponent
];

export { ItemMasterComponent } from './item-master.component';
