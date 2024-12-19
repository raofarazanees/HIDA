import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { getColumnDefsForRejectLog, getDefaultColDef } from '../../../modal/ag-grid.constants';
import { itemMasterMessages } from '../../../modal/item-master-messages.constants';
import { GetRejectLogByitemPGUID } from '../../../store/actions';
import { ItemMasterState } from '../../../store/reducers';
import { getRejectLog, getRejectLogLoader } from '../../../store/selectors';
import { UnspscColumnRendererComponent } from '../../unspsc-selection/aggrid-column-renderer/unspsc-column-renderer.component';

@Component({
  selector: 'app-reject-log',
  templateUrl: './reject-log.component.html',
  styleUrls: ['./reject-log.component.scss']
})
export class RejectLogComponent implements OnInit, OnDestroy {
  gridOptions: GridOptions;
  frameworkComponents = { unspscCodeRendererComponent: UnspscColumnRendererComponent };
  private gridApi: GridApi;
  loader$: Observable<boolean> = this.store.select(getRejectLogLoader);
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RejectLogComponent>,
    private readonly store: Store<ItemMasterState>
  ) {}

  ngOnInit() {
    this.initGridOption();
    this.store.dispatch(new GetRejectLogByitemPGUID({ itemPGUID: this.data.itemPguid }));
    this.listenDataChanges();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private listenDataChanges(): void {
    this.store
      .select(getRejectLog)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== null)
      )
      .subscribe(
        (data: any) => {
          this.gridApi.setRowData(data);
        },
        () => {
          this.gridApi.setRowData([]);
          this.gridApi.showNoRowsOverlay();
        }
      );
  }

  private initGridOption() {
    this.gridOptions = {
      columnDefs: getColumnDefsForRejectLog(),
      defaultColDef: getDefaultColDef(),
      pagination: true,
      paginationPageSize: 20,
      rowData: [],
      rowHeight: 30,
      overlayNoRowsTemplate: itemMasterMessages.noChangeLogRecords
    };
  }
}
