import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ForStagingCurationProductItemView } from 'src/app/features/admin-dashboard/modal/staging_curation_wb_ui.constants';
import { BaseContainer } from '../../../containers/base.container';
import { GetStagingProductItemForView } from '../../../store/actions';
import { StagingCurationState } from '../../../store/reducers';
import { stagingProductItemView } from '../../../store/selectors';

@Component({
  selector: 'app-staging-product-items-view-dialog',
  templateUrl: './staging-product-items-view-dialog.component.html',
  styleUrls: ['./staging-product-items-view-dialog.component.scss']
})
export class StagingProductItemsViewDialogComponent extends BaseContainer implements OnInit {
  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Items For Product...</span>';
  gridApi: GridApi;
  rowCount: number = 0;
  gridOptions: GridOptions = ForStagingCurationProductItemView(this.gridRowHeight);
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    private readonly StagingStore: Store<StagingCurationState>,
    private readonly cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<StagingProductItemsViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    super();
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.getItemsOfProducts();
  }

  private getItemsOfProducts(): void {
    this.gridApi.showLoadingOverlay();
    this.StagingStore.dispatch(GetStagingProductItemForView({payload:{ productID: this.inputData.productId }}));
    this.StagingStore
      .select(stagingProductItemView)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== null)
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

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }
}
