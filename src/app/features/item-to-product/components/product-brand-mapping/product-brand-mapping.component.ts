import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationState, getLoadingState, getTaskDetails } from '@app-store';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { taskSubmitInfo } from 'src/app/features/interface/task-submit';
import { ForProductBrandTaggingReview } from '../../../../features/admin-dashboard/modal/product-brand-tagging_constants';
import { BaseContainer } from '../../containers/base.container';
import { GetProductBrandForConfirmation, TaskSubmissionProductBrand } from '../../store/actions';
import { GraphState } from '../../store/reducers';
import { getGraphLoading, getProductBrandData } from '../../store/selectors';
import { ItemtopairActionCommentDialogComponent } from '../for-item-pairs-confirmation/itemtopair-action-comment-dialog/itemtopair-action-comment-dialog.component';

@Component({
  selector: 'app-product-brand-mapping',
  templateUrl: './product-brand-mapping.component.html',
  styleUrls: ['./product-brand-mapping.component.scss']
})
export class ProductBrandMappingComponent extends BaseContainer implements OnInit, OnDestroy {
  taskDetails: any = undefined;
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  rowCount: number = 0;
  overlayLoading: string = '<span class="ag-overlay-loading-center">Fetching Product...</span>';
  gridApi: GridApi;
  gridOptions: GridOptions = ForProductBrandTaggingReview(this.gridRowHeight);
  private readonly destroyed$ = new Subject<boolean>();
  confirmationLoading$: Observable<boolean> = this.graphStore.select(getGraphLoading);

  constructor(
    private readonly appStore: Store<ApplicationState>,
    private readonly cd: ChangeDetectorRef,
    private readonly graphStore: Store<GraphState>,
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
    this.gridApi.destroy();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (this.isInvalidTask()) {
      this.gridApi.showNoRowsOverlay();
    } else {
      this.getProductBrandForConfirmation();
    }
  }
  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }
  
  getProductBrandForConfirmation() {
    this.gridApi.showLoadingOverlay();
    this.graphStore.dispatch(new GetProductBrandForConfirmation({ docPGUID: this.userProfile.routeState?.groupName }));
    this.graphStore
      .select(getProductBrandData)
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

  OnTaskSubmit(actionType: string) {
    const dialogRef = this.dialog.open(ItemtopairActionCommentDialogComponent, {
      width: '500px',
      minHeight: '200px',
      disableClose: true,
      data: { actionType: actionType }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result?.isClosed) {
        const data: taskSubmitInfo = {
          workflowID: this.userProfile.routeState?.groupName,
          taskID: this.userProfile.routeState?.taskId,
          taskTitle: this.userProfile.routeState?.taskTitle,
          confirmedByUserEmail: this.userProfile.email,
          confirmedBy: this.userProfile.userName,
          actionPerformed: actionType,
          confirmationComments: result?.comment || ''
        };
       this.graphStore.dispatch(new TaskSubmissionProductBrand(data));
      }
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
