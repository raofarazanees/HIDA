import { DownloadProductMergeUnmergedGraphFile, CloseDrawerAt, CloseDialogAt } from './../../../../store/actions/common.actions';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationState, getUserProfile, UserProfileState } from '@app-store';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { DashboardState } from 'src/app/features/admin-dashboard/store/reducers';
import {
  getProductManageGraphUploading,
  closeDialogAt
} from 'src/app/features/admin-dashboard/store/selectors';
import { ForGraphProductReview } from 'src/app/features/item-to-product/components/graphs/ag-grid_graph-constants';

@Component({
  selector: 'app-download-graph-product-preview',
  templateUrl: './download-graph-product-preview.component.html',
  styleUrls: ['./download-graph-product-preview.component.scss']
})
export class DownloadGraphProductPreviewComponent implements OnInit {
  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Items For Product...</span>';
  gridApi: GridApi;
  rowCount: number = 0;
  gridOptions: GridOptions = ForGraphProductReview(30);
  private readonly destroyed$ = new Subject<boolean>();
  loading$: Observable<any> = this.store.select(getProductManageGraphUploading);
  profile: UserProfileState;

  constructor(
    private readonly store: Store<DashboardState>,
    private readonly appStore: Store<ApplicationState>,
    public dialogRef: MatDialogRef<DownloadGraphProductPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public graphData: any,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
   
    this.store
      .select(closeDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((time: any) => time)
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(new CloseDrawerAt(new Date().getTime()));
        }, 200);
      });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.graphData.data.graphProductItems)
    this.cd.markForCheck();
  }

  downloadGraphItemFile() {

      const dataToPost = JSON.parse(JSON.stringify(this.graphData.searchCriteria));
      dataToPost.totalRecords =  this.graphData.data.totalRecords;
      this.store.dispatch(new DownloadProductMergeUnmergedGraphFile(dataToPost));
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new CloseDialogAt(0));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
