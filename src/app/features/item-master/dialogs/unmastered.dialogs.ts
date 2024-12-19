import { MatDialog } from '@angular/material/dialog';
import { ModelDialogueComponent } from 'src/app/shared/components';
import { SubmissionDialogComponent } from '../components/unmastered/submission-dialog/submission-dialog.component';
import { RejectLogComponent } from '../components/unmastered/reject-log/reject-log.component';
import { UnspscSelectionComponent } from '../components/unspsc-selection/unspsc-selection.component';

export const unMasteredDialogs = {
  confirmDialog: (data: any, matDialog: MatDialog) => {
    return matDialog.open(ModelDialogueComponent, {
      width: '600px',
      data
    });
  },
  unspscSelection: (data: any, matDialog: MatDialog) => {
    return matDialog.open(UnspscSelectionComponent, {
      width: '100%',
      data
    });
  },
  submissionStepper: (data: any, matDialog: MatDialog) => {
    return matDialog.open(SubmissionDialogComponent, {
      width: '80%',
      data,
      disableClose: true
    });
  },
  rejectLog: (data: any, matDialog: MatDialog) => {
    return matDialog.open(RejectLogComponent, {
      width: '80%',
      data
    });
  }
};
