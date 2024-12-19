import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridReadyEvent } from 'ag-grid-community';
import { GridApi, GridOptions } from 'ag-grid-enterprise';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getLoadingState, ApplicationState, getTaskDetails } from '@app-store';

import { BaseContainer } from '../../containers/base.container';
import { forPairsConfirmationGridOptions } from './ag-grid.constants';
import { GetItemPairsForConfirmation, ConfirmItemPairs } from '../../store/actions';
import { getConfirmationLoading, getItemPairs } from '../../store/selectors';
import { ConfirmationState } from '../../store/reducers/confirmation.reducer';
import { ItemtopairActionCommentDialogComponent } from './itemtopair-action-comment-dialog/itemtopair-action-comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-for-item-pairs-confirmation',
  templateUrl: './for-item-pairs-confirmation.component.html',
  styleUrls: ['./for-item-pairs-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForItemPairsConfirmationComponent extends BaseContainer implements OnInit, OnDestroy {
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  confirmationLoading$: Observable<boolean> = this.pairingStore.select(getConfirmationLoading);
  taskDetails: any = undefined;
  gridApi: GridApi;
  rowCount: number = 0;
  userProfile: any = {};
  gridOptions: GridOptions = forPairsConfirmationGridOptions(this.gridRowHeight);
  pairsOverlayLoadingTemplate: string = '<span class="ag-overlay-loading-center">Fetching Item Pairs...</span>';

  constructor(
    private readonly appStore: Store<ApplicationState>,
    private readonly pairingStore: Store<ConfirmationState>,
    private readonly cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.userProfile = BaseContainer.prototype.userProfile;
    this.getTaskDetails();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (this.isInvalidTask()) {
      this.gridApi.showNoRowsOverlay();
    } else {
      this.getItemPairs();
    }
  }

  onItemParisSubmit(actionType: string): void {
    const dialogRef = this.dialog.open(ItemtopairActionCommentDialogComponent, {
      width: '500px',
      minHeight: '200px',
      //disableClose: true,
      data: { actionType: actionType }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result?.isClosed) {
        const data = {
          workflowID: this.userProfile.routeState?.groupName,
          taskID: this.userProfile.routeState?.taskId,
          taskTitle: this.userProfile.routeState?.taskTitle,
          confirmedByUserEmail: this.userProfile.email,
          confirmedBy: this.userProfile.userName,
          actionPerformed: actionType,
          confirmationComments: result?.comment || ''
        };
        this.pairingStore.dispatch(new ConfirmItemPairs(data));
      }
    });
  }

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  ngOnDestroy(): void {}

  private isInvalidTask() {
    return this.taskDetails && this.taskDetails.error;
  }

  private getTaskDetails(): void {
    this.appStore
      .select(getTaskDetails)
      .pipe(filter((data) => data !== null))
      .subscribe((taskDetails: any) => {
        this.taskDetails = taskDetails;
      });
  }

  private getItemPairs(): void {
    this.gridApi.showLoadingOverlay();
    this.pairingStore.dispatch(new GetItemPairsForConfirmation({ docPGUID: this.userProfile.routeState?.groupName }));
    this.pairingStore
      .select(getItemPairs)
      .pipe(filter((data) => data !== null))
      .subscribe((pairs: any) => {
        this.rowCount = pairs.length;
        if (this.rowCount) {
          this.gridApi.setRowData(pairs);
          this.gridApi.hideOverlay();
        } else {
          this.gridApi.setRowData([]);
          this.gridApi.showNoRowsOverlay();
        }
        this.cd.markForCheck();
      });
  }
}
