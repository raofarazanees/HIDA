import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { getColumnDefsForChangeLog, getDefaultColDef } from '../../../modal/ag-grid.constants';
import { itemMasterMessages } from '../../../modal/item-master-messages.constants';
import { GetChangeLogByMapID } from '../../../store/actions';
import { ItemMasterState } from '../../../store/reducers';
import { getChangeLog, getChangeLogLoader } from '../../../store/selectors';
import { AttributeExtensionColumnRendererComponent } from '../../attribute-extension-renderer/attribute-extension-renderer.component';
import { UnspscColumnRendererComponent } from '../../unspsc-selection/aggrid-column-renderer/unspsc-column-renderer.component';

@Component({
  selector: 'app-log-dialog-item-master',
  templateUrl: './log-dialog.component.html',
  styleUrls: ['./log-dialog.component.scss']
})
export class LogDialogComponent implements OnInit, OnDestroy {
  gridOptions: GridOptions;
  frameworkComponents = {
    unspscCodeRendererComponent: UnspscColumnRendererComponent,
    attributeColumnRendererComponent: AttributeExtensionColumnRendererComponent
  };
  private gridApi: GridApi;
  loader$: Observable<boolean> = this.store.select(getChangeLogLoader);
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LogDialogComponent>,
    private readonly store: Store<ItemMasterState>
  ) {}

  ngOnInit() {
    this.initGridOption();
    this.store.dispatch(new GetChangeLogByMapID({ itemMapId: this.data.itemMapId, itemPguid: this.data.itemPguid }));
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
      columnDefs: getColumnDefsForChangeLog(this.data.attributeExtensions),
      defaultColDef: getDefaultColDef(),
      pagination: true,
      paginationPageSize: 20,
      rowData: [],
      rowHeight: 30,
      overlayNoRowsTemplate: itemMasterMessages.noChangeLogRecords
    };
  }
}
