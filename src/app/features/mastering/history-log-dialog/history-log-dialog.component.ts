import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { GetParentColumnOptions } from '../model/manf-master-models/ag-grid-columns/parent-manf-column.constants';
import { BrandMasterState, ProductEntitlementState, facilityMasterState, manfMasterState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { GetParentManfChangeLogData, GetUnspscChangeLog$, getFacilityChangeLogRecords$ } from '../store/selectors';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { childManfChangeLogModel, parentManfChangeLogModel } from '../model/manf-master-models/interface/child-parent-manf.interface';
import { UnspscRecordInterface, unspscMasterState } from '../model/manf-master-models/interface/unspsc-master.interface';
import { GetUnspscChangeLog } from '../store/actions';
import { facilityMappedChangeLogData, facilityMasterChangeLogData } from '../model/manf-master-models/interface/facility-master-state.interface';
import { BrandCVChangeLogModel, BrandMappingRecord } from '../model/manf-master-models/interface/brand-cv-filter-options';
import { GetBrandCVChangeLogRecords } from '../store/selectors/brand-master.selector';
import { GetI2PGraphHistoryChangeLogData, GetProductChangeLogs$ } from '../store/selectors/product-entitlement.selector';
import { i2pGraphHistoryChangeLogModel, productEntitlementRecord } from '../model/manf-master-models/interface/product-entitlement.interface';
import { GetZipChangeLog$ } from '../store/selectors/zip-master.selector';
import { ZipMasterResponseData } from '../model/manf-master-models/interface/zip-master.interface';

@Component({
  selector: 'app-history-log-dialog',
  templateUrl: './history-log-dialog.component.html',
  styleUrls: ['./history-log-dialog.component.scss']
})
export class HistoryLogDialogComponent implements OnInit {
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  gridOptions: GridOptions;
  public readonly destroyed$ = new Subject<boolean>();
  constructor(
    private readonly manfMasterStore: Store<manfMasterState>,
    private readonly unspscMasterStore: Store<unspscMasterState>,
    private readonly facilityMasterStore: Store<facilityMasterState>,
    private readonly brandMasterStore: Store<BrandMasterState>,
    private readonly prodInfoStore: Store<ProductEntitlementState>,
    public dialogRef: MatDialogRef<HistoryLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogTriggeredFor: string; title: string; subTitle: string; agGridOptions: GridOptions }
  ) {}

  ngOnInit() {
    this.gridOptions = this.data.agGridOptions;
  }
  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
    this.dialogOpenedFor(this.data.dialogTriggeredFor);
    this.checkDeviceWithAndFitColumn(this.gridApi);
  }
  getRowStyle(params) {
    if (params.node.rowIndex % 2 === 0) {
      return { background: 'rgba(0,0,0,.05)' };
    }
  };

  private dialogOpenedFor(value: string) {
    switch (value) {
      case 'ParentManf':
        this.listenParentManfLogData();
        break;
      case 'ChildManf':
        this.listenParentManfLogData();
        break;
      case 'UnspscMaster':
        this.listenUnspscLogData();
        //  this.gridApi.sizeColumnsToFit();
        break;
      case 'MarketMasterLog':
        this.listenUnspscLogData();
        break;
      case 'FacilityMaster':
        this.listenFacilityMasterLogData();
        break;
      case 'BrandMaster':
        this.listenBrandMasterLogData();
        break;
      case 'ProductInfoLog':
        this.listenProductInfoLogData();
        break;
      case 'BrandMapMaster':
        this.listenBrandMasterLogData();
        //  this.gridApi.sizeColumnsToFit();
        break;
      case 'ZipMaster':
        this.listenZipLogData();
      case 'I2PGraphHistory':
        this.listenI2PGraphHistoryLogData();
        break;

      default:
        this.listenParentManfLogData();
        break;
    }
  }

  checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel && grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    } else {
      return true
    }
  }

  private listenParentManfLogData(): void {
    this.manfMasterStore
      .select(GetParentManfChangeLogData)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( item => item != null))
      .subscribe((item: parentManfChangeLogModel[] | childManfChangeLogModel[] | any[]) => {
        if (item != null) {
          this.setDataInAgGrid(item);
        }
      });
  }

  private listenUnspscLogData(): void {
    this.unspscMasterStore
      .select(GetUnspscChangeLog$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( item => item != null))
      .subscribe((item: UnspscRecordInterface[] | childManfChangeLogModel[] | any[]) => {
        if (item != null) {
          this.setDataInAgGrid(item);
        }
      });
  }

  private listenZipLogData(): void {
    this.unspscMasterStore
      .select(GetZipChangeLog$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( item => item != null))
      .subscribe((item: ZipMasterResponseData[] | childManfChangeLogModel[] | any[]) => {
        if (item != null) {
          this.setDataInAgGrid(item);
        }
      });
  }

  private listenFacilityMasterLogData(): void {
    this.facilityMasterStore
      .select(getFacilityChangeLogRecords$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( item => item != null))
      .subscribe((item: facilityMasterChangeLogData[]  | facilityMappedChangeLogData[] | any[]) => {
        if (item != null) {
          this.setDataInAgGrid(item);
        }
      });
  }

  private listenBrandMasterLogData(): void {
    this.brandMasterStore
      .select(GetBrandCVChangeLogRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( item => item != null))
      .subscribe((item: BrandCVChangeLogModel[] | BrandMappingRecord[]) => {
        if (item != null) {
          this.setDataInAgGrid(item);
        }
      });
  }

  private listenProductInfoLogData(): void {
    this.prodInfoStore
      .select(GetProductChangeLogs$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( item => item != null))
      .subscribe((item: productEntitlementRecord[]) => {
        if (item != null) {
          this.setDataInAgGrid(item);
        }
      });
  }

  private setDataInAgGrid(item: any) {
    if ( item && item.length > 0) {
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private listenI2PGraphHistoryLogData(): void {
    this.manfMasterStore
      .select(GetI2PGraphHistoryChangeLogData)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$), filter(item => item != null))
      .subscribe((item: i2pGraphHistoryChangeLogModel[] | any[]) => {
        if (item != null) {
          this.setDataInAgGrid(item);
        }
      });
  }
}
