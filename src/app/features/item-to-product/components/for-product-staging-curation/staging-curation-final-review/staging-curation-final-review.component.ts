import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { getLoadingState, ApplicationState, getTaskDetails } from '@app-store';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import {  takeUntil, filter } from 'rxjs/operators';
import { ForStagingCurationWBUI } from 'src/app/features/admin-dashboard/modal/staging_curation_wb_ui.constants';
import { UnspscColumnRendererComponent } from 'src/app/features/item-master/components/unspsc-selection/aggrid-column-renderer/unspsc-column-renderer.component';
import { BaseContainer } from '../../../containers/base.container';
import { ConfirmCuratedProduct, CuratedRecords } from '../../../modal/staging-curation-save-later.interface';
import { GetStagingCurationFinalProductForReview, StagingCurationSubmitFinalConfirmation } from '../../../store/actions';
import { StagingCurationState } from '../../../store/reducers';
import { GetStagingLoadingState, retrieveProductForFinalReview } from '../../../store/selectors';
import { StagingProductItemsViewDialogComponent } from '../staging-product-items-view-dialog/staging-product-items-view-dialog.component';
import { CheckboxButtonRendererComponent } from '@app-shared-components';

export enum actionStatus {
  Approve = 'A',
  Reject = 'R',
  Reset = 'N'
}

@Component({
  selector: 'app-staging-curation-final-review',
  templateUrl: './staging-curation-final-review.component.html',
  styleUrls: ['./staging-curation-final-review.component.scss']
})
export class StagingCurationFinalReviewComponent extends BaseContainer implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  isDrawerOpened: boolean = false;
  taskDetails: any = undefined;
  overlayLoading: string = '<span class="ag-overlay-loading-center">Fetching Product...</span>';
  gridApi: GridApi;
  gridOptions: GridOptions = ForStagingCurationWBUI(this.gridRowHeight, this, true);
  updatedRecords: any[] = [];
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  loading$: Observable<boolean> = this.StagingStore.select(GetStagingLoadingState);
  userProfile: any = {};
  rowCount: number = 0;
  isEnabledSubmitButton: boolean = false;
  private readonly destroyed$ = new Subject<boolean>();

  frameworkComponents = {
    unspscCodeRendererComponent: UnspscColumnRendererComponent,
    checkboxSelector: CheckboxButtonRendererComponent
  };

  constructor(
    private readonly appStore: Store<ApplicationState>,
    private readonly StagingStore: Store<StagingCurationState>,
    private readonly cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.userProfile = BaseContainer.prototype.userProfile;
    this.getTaskDetails();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (this.isInvalidTask()) {
      this.gridApi.showNoRowsOverlay();
    } else {
      this.getProductBrandForConfirmation();
    }
  }

  isInvalidTask() {
    return false;
  }

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  viewProductsItems(e) {
    if (
      e.colDef.headerName === 'Approve' ||
      e.colDef.headerName === 'Reject' ||
      e.column.colId === 'status' ||
      e.column.colId === 'newUNSPSCCode' ||
      e.column.colId === 'newUNSPSCDesc' ||
      e.column.colId === 'unspscComments'
    ) {
      return;
    }
    const dialogRef = this.dialog.open(StagingProductItemsViewDialogComponent, {
      width: '100%',
      minHeight: 'auto',
      maxWidth: '96vw',
      position: { top: '30px' },
      disableClose: true,
      data: { productId: e.data.productID }
    });
  }

  onCellDoubleClicked(event) {
    return false;
  }

  onSelectionAll(status: string) {
    for (let i = this.gridOptions.api.getFirstDisplayedRow(); i <= this.gridOptions.api.getLastDisplayedRow(); i++) {
      const rowNode = this.gridOptions.api.getDisplayedRowAtIndex(i);
      this.isEnabledSubmitButton = actionStatus[status] == 'A' || actionStatus[status] == 'R' ? true : false;
      rowNode.setData({ ...rowNode.data, ...{ status: actionStatus[status],isModified:this.isEnabledSubmitButton } });
    }
  }

  getProductBrandForConfirmation() {
    this.gridApi.showLoadingOverlay();
    this.StagingStore.dispatch(GetStagingCurationFinalProductForReview({ payload: { groupName: this.userProfile.routeState?.groupName } }));
    this.StagingStore.select(retrieveProductForFinalReview)
      .pipe(
        filter((data) => data !== null),
        takeUntil(this.destroyed$)
      )
      .subscribe((item: any) => {
        this.rowCount = item.length;
        this.isEnabledSubmitButton = false;
        if (this.rowCount) {
          this.gridApi.setRowData(item);
          this.gridApi.hideOverlay();
        } else {
          this.gridApi.setRowData([]);
          this.gridApi.showNoRowsOverlay();
        }
        this.cd.markForCheck();
      });
  }

  submitRecords() {
    const filterRecords = this.getFilterActedRecords();
    if (filterRecords && filterRecords.length > 0) {
      const dataToSave: ConfirmCuratedProduct = {
        workflowID: this.userProfile.routeState?.groupName,
        taskID: this.userProfile.routeState?.taskId,
        taskTitle: this.userProfile.routeState?.taskTitle,
        confirmedBy: this.userProfile.userName,
        confirmedByUserEmail: this.userProfile.email,
        records: filterRecords
      };
      this.appStore.dispatch(StagingCurationSubmitFinalConfirmation({ payload: dataToSave }));
    }
  }

  private getFilterActedRecords() {
    const filterRecords: CuratedRecords[] = this.getAllRows()
      .filter((item: any) => {
        return item.status === 'A' || item.status === 'R';
      })
      .map((item: any) => {
        return { confirmationStatus: item.status, productID: item.productID };
      });
    return filterRecords;
  }

  private enabledSubmitButton() {
    const filterRecords = this.getFilterActedRecords();
    filterRecords.length > 0 ? (this.isEnabledSubmitButton = true) : (this.isEnabledSubmitButton = false);
    this.cd.detectChanges();
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private getTaskDetails(): void {
    this.appStore
      .select(getTaskDetails)
      .pipe(filter((data) => data !== null))
      .subscribe((taskDetails: any) => {
        this.taskDetails = taskDetails;
        this.cd.detectChanges();
      });
  }
}
