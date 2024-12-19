import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ProductEntitlementOptions } from '../../../model/manf-master-models/ag-grid-columns/product-entitlement.utils';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { ProductEntitlementState } from '../../../store/reducers';
import { GetLoadingStateProduct, GetProductEntitlements$, GetProductList$ } from '../../../store/selectors/product-entitlement.selector';
import { Observable, Subject } from 'rxjs';
import { AgGridActionCellComponent } from '@app-shared-components';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { ProductEntitlementChangeLogOptions } from '../../../model/manf-master-models/ag-grid-columns/product-infomation-changelog.const';
import { GetProductChangeLogRecords } from '../../../store/actions';

@Component({
  selector: 'app-product-details-view',
  templateUrl: './product-details-view.component.html',
  styleUrls: ['./product-details-view.component.scss']
})
export class ProductDetailsViewComponent implements OnInit {
  gridApi: GridApi | any;
  gridOptions: GridOptions = ProductEntitlementOptions(30, this, true, '',false);
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  public readonly destroyed$ = new Subject<boolean>();
  loading$: Observable<boolean> = this.productStore.select(GetLoadingStateProduct);

  frameworkComponents = {
    actionCellRenderer: AgGridActionCellComponent
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }, private readonly productStore: Store<ProductEntitlementState>,   private modelRef: MatDialog) {}

  ngOnInit() {}

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
    this.gridApi.paginationSetPageSize(20);
    this.listenDataChanges();
  }

  private listenDataChanges() {
    this.productStore
      .select(GetProductList$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((item) => item != null)
      )
      .subscribe((item: any) => {
        if (item != null) {
          // this.productEntitlementRes = {
          //   totalRecords: item.totalRecords,
          //   records: item.records.map((record) => {
          //     return {
          //       ...record,
          //       brandName: record.brandMapIDName ? this.covertStringToArrayBrandMap(record.brandMapIDName) : [],
          //       unspscCodeHist: record.unspscCode,
          //       unspscSourceHist: record.unspscSource,
          //       isUNSPSCUpdated:"N",
          //       userRole:this.userRole
          //     };
          //   })
          // };
          this.setDataInAgGrid(item.records);
        }
      });
  }

  private setDataInAgGrid(item: any) {
    if (item && item.length > 0) {
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private openLogDialog(node) {
    this.productStore.dispatch(GetProductChangeLogRecords({ payload: { productID: node.data.prodID } }));
    const logDialogRef = this.modelRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10px !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'ProductInfoLog',
        title: 'Product Information',
        subTitle: ``,
        data: node.data,
        agGridOptions: ProductEntitlementChangeLogOptions(30, this)
      }
    });
    return false;
  }

  
}
