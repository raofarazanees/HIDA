import { ChangeDetectorRef, Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { filter, takeUntil } from 'rxjs/operators';
import { GraphState } from '../../../store/reducers';
import { getItemForProductGraph } from '../../../store/selectors';
import { forGraphItemGridOptions } from '../ag-grid_graph-constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetGraphItemsForProduct } from './../../../store/actions/graph.actions';
import { BaseContainer } from './../../../../manufacturer/containers/base.container';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-graph-product-items-dialog',
  templateUrl: './graph-product-items-dialog.component.html',
  styleUrls: ['./graph-product-items-dialog.component.scss']
})
export class GraphProductItemsDialogComponent extends BaseContainer implements OnInit, OnDestroy {
  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Items For Product...</span>';
  gridApi: GridApi;
  rowCount: number = 0;
  gridOptions: GridOptions = forGraphItemGridOptions(this.gridRowHeight);
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    private readonly graphStore: Store<GraphState>,
    private readonly cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<GraphProductItemsDialogComponent>,
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
    this.getItemPairs();
  }

  private getItemPairs(): void {
    this.gridApi.showLoadingOverlay();
    this.graphStore.dispatch(new GetGraphItemsForProduct({ productID: this.inputData.productId, docPGUID: this.inputData.docPGUID}));
    this.graphStore
      .select(getItemForProductGraph)
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
