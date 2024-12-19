import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ItemToProductGraphDetailsGrid } from '../../../model/manf-master-models/ag-grid-columns/item-to-product-graph-details.util';
import { ItemToProductGraphDetailsResponse, ProductEntitlementState } from '../../../model/manf-master-models/interface/product-entitlement.interface';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GetItemToProductDetails } from '../../../store/selectors/product-entitlement.selector';
import { GetI2PGraphHistoryChangeLog } from '../../../store/actions/product-entitlement.action';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { I2PGraphHistoryOptions } from '../../../model/manf-master-models/ag-grid-columns/i2p-graph-history.utils';

@Component({
  selector: 'app-item-to-product-graph-details',
  templateUrl: './item-to-product-graph-details.component.html',
  styleUrls: ['./item-to-product-graph-details.component.scss']
})
export class ItemToProductGraphDetailsComponent implements OnInit {
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  gridOptions: GridOptions;
  rowCount: number = 0;
  itemToProductGraphDetails: ItemToProductGraphDetailsResponse;
  @Input()
  readOnly: boolean;
  public readonly destroyed$ = new Subject<boolean>();

  constructor(
    private readonly productStore: Store<ProductEntitlementState>, private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { dialogTriggeredFor: string; title: string; subTitle: string; agGridOptions: GridOptions, prodId: number }) {
  }

  ngOnInit() {
    console.log("inside I2P")
    this.gridOptions = ItemToProductGraphDetailsGrid(30, this, this.readOnly);
  }


  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
    this.gridApi.paginationSetPageSize(20);
    this.listenDataChanges();
  }

  getRowStyle(params) {
    if (params.node.rowIndex % 2 === 0) {
      return { background: 'rgba(0,0,0,.05)' };
    }
  };

  private listenDataChanges() {
    this.productStore
      .select(GetItemToProductDetails)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: ItemToProductGraphDetailsResponse) => {
        if (item != null) {
          this.itemToProductGraphDetails = JSON.parse(JSON.stringify(item));
          this.setDataInAgGrid(this.itemToProductGraphDetails.itemToProductList);
        }
      });
  }

  private setDataInAgGrid(item: any) {
    if (item && item.length > 0) {

      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  openGraphLogDialog() {
    this.productStore.dispatch(GetI2PGraphHistoryChangeLog({ payload: { productID: this.data.prodId } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '80vw',
      maxWidth: '80vw',
      position: { top: '10px !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'I2PGraphHistory',
        title: 'I2P Graph History',
        subTitle: ``,
        agGridOptions: I2PGraphHistoryOptions(30, this)
      }
    });
    return false;
  }
}
