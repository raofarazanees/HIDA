import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../components/mastered/details/details.component';
import { EditComponent } from '../components/mastered/edit/edit.component';
import { LogDialogComponent } from '../components/mastered/log-dialog/log-dialog.component';
import { UnspscSelectionComponent } from '../components/unspsc-selection/unspsc-selection.component';

export const masteredDialogs = {
  changeLog: {
    edit: (data: any, matDialog: MatDialog) => {
      return matDialog.open(EditComponent, {
        width: '80%',
        data
      });
    },
    view: (data: any, matDialog: MatDialog) => {
      return matDialog.open(LogDialogComponent, {
        width: '80%',
        data
      });
    }
  },
  unspscSelection: (data: any, matDialog: MatDialog) => {
    return matDialog.open(UnspscSelectionComponent, {
      width: '80%',
      data: {
        productDesc: data.productDesc,
        unspscCode: data.unspscCode
      }
    });
  },
  itemDetails: (data: any, matDialog: MatDialog) => {
    return matDialog.open(DetailsComponent, {
      width: '80%',
      data
    });
  }
};
