import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { GetUploadedFileDetails, GetUploadedFileHistory } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import {
  getUploadedFileHistoryLoading,
  getUploadedFileHistory,
  getUploadedFileDetailsLoading,
  getUploadedFileDetails
} from '../../../store/selectors';

@Component({
  selector: 'app-file-upload-history',
  templateUrl: './file-upload-history.component.html',
  styleUrls: ['./file-upload-history.component.scss']
})
export class FileUploadHistoryComponent implements OnInit, OnDestroy {
  gridOptions: GridOptions;
  fileLoading$: Observable<any> = this.store.select(getUploadedFileHistoryLoading);
  detailsLoading$: Observable<any> = this.store.select(getUploadedFileDetailsLoading);
  params: {
    header?: string;
    fileType?: string;
  } = {};
  fileDetails: any;
  selectedFileRow: any;
  viewModal: any = {};

  private gridApi: GridApi;
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    private readonly store: Store<DashboardState>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    readonly matBottomSheetRef: MatBottomSheetRef
  ) {}

  ngOnInit(): void {
    this.prepareParams();
    this.store.dispatch(new GetUploadedFileHistory({ fileType: this.params.fileType }));
    this.initGridOption();
    this.listenDataChanges();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  refreshUplodedFileHistory(): void {
    this.store.dispatch(new GetUploadedFileHistory({ fileType: this.params.fileType }));
  }

  onSelectionChanged(): void {
    this.selectedFileRow = this.gridApi.getSelectedRows()[0];
    if (!this.selectedFileRow.docPGUID) {
      return;
    }
    this.store.dispatch(new GetUploadedFileDetails({ fileType: this.params.fileType, fileID: this.selectedFileRow.docPGUID }));
    this.gridOptions.columnApi.setColumnsVisible(['sourceCount', 'validatedRecCount', 'createdBy', 'createdDate'], false);
    this.viewModal.showDetails = true;
  }

  clearRowSelection(): void {
    this.viewModal.showDetails = false;
    this.selectedFileRow = undefined;
    this.gridApi.deselectAll();
    this.gridOptions.columnApi.setColumnsVisible(['sourceCount', 'validatedRecCount', 'createdBy', 'createdDate'], true);
  }

  private prepareParams(): void {
    switch (this.data.key) {
      case 'unspsc_reclassification_history':
        this.params.header = 'UNSPSC Reclassification Uploaded File History';
        this.params.fileType = 'HIDA_UNSPSC_RECLASSIFICATION';
        break;
      case 'unspsc_client_correction_history':
        this.params.header = 'UNSPSC Client Correction Uploaded File History';
        this.params.fileType = 'HIDA_UNSPSC_CLIENT_CORRECTION';
        break;
    }
  }

  private listenDataChanges(): void {
    this.store
      .select(getUploadedFileHistory)
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
    this.store
      .select(getUploadedFileDetails)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== null)
      )
      .subscribe((data: any) => {
        this.fileDetails = data;
      });
  }

  private initGridOption() {
    this.gridOptions = {
      columnDefs: this.getColumnDefsForFileLog(),
      defaultColDef: this.getDefaultColDef(),
      pagination: true,
      paginationPageSize: 20,
      rowData: [],
      rowHeight: 30,
      overlayNoRowsTemplate: 'There is no uploaded files to view'
    };
  }

  private getDefaultColDef(): any {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['contains']
      }
    };
  }

  private getColumnDefsForFileLog(): any {
    return [
      {
        headerName: 'File Name',
        field: 'originalFileName',
        tooltipField: 'originalFileName',
        flex: 4,
        valueFormatter: (params: any): any => (params.value ? params.value : '-')
      },
      {
        headerName: 'Total',
        field: 'sourceCount',
        flex: 1,
        tooltipField: 'sourceCount',
        valueFormatter: (params: any): any => (params.value ? params.value : 0)
      },
      {
        headerName: 'Rejected',
        field: 'validationRejCount',
        flex: 1,
        tooltipField: 'validationRejCount',
        valueFormatter: (params: any): any => (params.value ? params.value : 0)
      },
      {
        headerName: 'Approved',
        flex: 1,
        field: 'validatedRecCount',
        tooltipField: 'validatedRecCount',
        valueFormatter: (params: any): any => (params.value ? params.value : 0)
      },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        tooltipField: 'status',
        valueFormatter: (params: any): any => (params.value ? params.value : '-')
      },
      {
        headerName: 'Uploaded By',
        field: 'createdBy',
        flex: 1,
        tooltipField: 'createdBy',
        valueFormatter: (params: any): any => (params.value ? params.value : '-')
      },
      {
        headerName: 'Uploaded At',
        field: 'createdDate',
        width: '130px',
        tooltipField: 'createdDate',
        tooltipValueGetter: this.timeFormatter,
        valueFormatter: this.timeFormatter
      }
    ];
  }

  private timeFormatter(params: any): string {
    return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm') : ' - ';
  }
}
