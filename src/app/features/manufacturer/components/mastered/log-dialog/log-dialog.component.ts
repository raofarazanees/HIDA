import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent, IGetRowsParams } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { getDefaultColDef, getColumnDefsForChangeLog } from '../../../modal/ag-grid.constants';
import { GetChangeLogByMapID } from '../../../store/actions';
import { ManufacturerState } from '../../../store/reducers';
import { getChangeLog, getChangeLogLoader } from '../../../store/selectors';

@Component({
  selector: 'app-log-dialog-facility-mastered-record',
  templateUrl: './log-dialog.component.html',
  styleUrls: ['./log-dialog.component.scss']
})
export class LogDialogComponent implements OnInit, OnDestroy {
  gridOptions: GridOptions;
  gridApi: GridApi;
  loader$: Observable<boolean> = this.store.select(getChangeLogLoader);
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LogDialogComponent>,
    private readonly store: Store<ManufacturerState>
  ) {}

  ngOnInit() {
    this.initGridOption();
    this.store.dispatch(
      new GetChangeLogByMapID({ manufacturerMapId: this.data.manufacturerMapId, manufacturerPguid: this.data.manufacturerPguid })
    );
    this.listenDataChanges();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  listenDataChanges(): void {
    this.store
      .select(getChangeLog)
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
      columnDefs: getColumnDefsForChangeLog(),
      defaultColDef: getDefaultColDef(),
      pagination: true,
      paginationPageSize: 20,
      rowData: [],
      rowHeight: 30,
      overlayNoRowsTemplate: 'There is no change log found'
    };
  }
}
