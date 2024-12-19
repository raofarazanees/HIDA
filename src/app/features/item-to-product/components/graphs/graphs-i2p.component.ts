import { GraphProductItemsDialogComponent } from './graph-product-items-dialog/graph-product-items-dialog.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationState, getLoadingState, getTaskDetails } from '@app-store';
import { Store } from '@ngrx/store';
import { GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseContainer } from '../../containers/base.container';
import { GraphState } from '../../store/reducers';
import { getGraphLoading, getItemGraph } from '../../store/selectors';
import { GridApi, GridOptions } from 'ag-grid-enterprise';
import { forGraphGridOptions } from './ag-grid_graph-constants';
import { GetGraphProductForMergeUnMerge, GraphProductMergeUnMergeAction } from '../../store/actions';
import { ItemtopairActionCommentDialogComponent } from '../for-item-pairs-confirmation/itemtopair-action-comment-dialog/itemtopair-action-comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-i2p-graphs',
  templateUrl: './graphs-i2p.component.html',
  styleUrls: ['./graphs-i2p.component.scss']
})
export class GraphsI2PComponent extends BaseContainer implements OnInit, OnDestroy {
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  confirmationLoading$: Observable<boolean> = this.graphStore.select(getGraphLoading);
  taskDetails: any = undefined;
  userProfile: any = {};
  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Product...</span>';
  gridApi: GridApi;
  rowCount: number = 0;
  gridOptions: GridOptions = forGraphGridOptions(this.gridRowHeight);
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    private readonly appStore: Store<ApplicationState>,
    private readonly graphStore: Store<GraphState>,
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
      this.gridApi.sizeColumnsToFit();
    }
  }

  onItemMergeSubmit(actionType: string): void {
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
        this.graphStore.dispatch(new GraphProductMergeUnMergeAction(data));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.gridApi.destroy();
  }

  onSelectionChanged(e) {
    const dialogRef = this.dialog.open(GraphProductItemsDialogComponent, {
      width: '100%',
      minHeight: 'auto',
      maxWidth: '96vw',
      position: { top: '50px' },
      disableClose: true,
      data: { productId: e.data.productID, docPGUID: this.userProfile.routeState?.groupName}
    });
  }

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  private getItemPairs(): void {
    this.gridApi.showLoadingOverlay();
    this.graphStore.dispatch(new GetGraphProductForMergeUnMerge({ docPGUID: this.userProfile.routeState?.groupName }));
    this.graphStore
      .select(getItemGraph)
      .pipe(
        filter((data) => data !== null),
        takeUntil(this.destroyed$)
      )
      .subscribe((item: any) => {
        this.rowCount = item.length;
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

  private getTaskDetails(): void {
    this.appStore
      .select(getTaskDetails)
      .pipe(filter((data) => data !== null))
      .subscribe((taskDetails: any) => {
        this.taskDetails = taskDetails;
      });
  }

  private isInvalidTask() {
    return this.taskDetails && this.taskDetails.error;
  }
}
