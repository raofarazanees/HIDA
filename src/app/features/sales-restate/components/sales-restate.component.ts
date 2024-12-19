import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from './../../../shared/services';
import { UtilityService } from './../../../shared/services';
import { AgGridTypeaheadComponent, DialogModel, ModelDialogueComponent, RadioButtonRendererComponent } from './../../../shared/components';

import { SalesRestateService } from '../services/sales-restate.service';
import {
  ApplicationState,
  getActiveDistributorPguid,
  getDistributors,
  getLoadingState,
  getRestatingSalesRoles,
  getTaskDetails,
  getUpdatingTaskState,
  UpdateTaskDetails
} from './../../../store';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { getColumnDefs, getDefaultColDef } from '../modal/ag-grid.constants';
import { SalesRestateModule } from '../sales-restate.module';
import { CommonActionsEnum, SubmitSalesRecord } from '../store/actions';
import { Actions, ofType } from '@ngrx/effects';
import { getSubmitState } from '../store/selectors';

@Component({
  selector: 'app-sales-restate',
  templateUrl: './sales-restate.component.html',
  styleUrls: ['./sales-restate.component.scss']
})
export class SalesRestateComponent implements OnInit, OnDestroy {
  taskDetails: any = null;
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  taskUpdating$: Observable<any> = this.appStore.select(getUpdatingTaskState);
  distributors$: Observable<any> = this.appStore.select(getDistributors);
  loader$: Observable<boolean> = this.store.select(getSubmitState);

  public modalRef: MatDialogRef<any>;

  frameworkComponents = {
    typeaheadEditor: AgGridTypeaheadComponent,
    radioSelector: RadioButtonRendererComponent
  };

  private dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const payload = this.getPayloadForSalesRestate(params);
      this.gridApi.showLoadingOverlay();
      this.getSalesRecords(params, payload);
    }
  } as IDatasource;

  constructor(
    private messageService: MessageService,
    private salesRestateService: SalesRestateService,
    public modalService: MatDialog,
    protected actions$: Actions,
    private utilityService: UtilityService,
    private readonly appStore: Store<ApplicationState>,
    private readonly store: Store<SalesRestateModule>
  ) {}

  gridOptions: GridOptions;
  gridApi: GridApi;
  isEnabledSubmitButton = false;
  totalRecords: number;
  submitedRecordLength: number;
  distributorPguid: number;
  hasExceptionLeadPermission = false;
  private cacheBlockSize = 20;
  private readonly destroyed$ = new Subject<boolean>();

  ngOnInit() {
    this.initGridOption();
    this.listenDataChanges();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initGridOption() {
    this.gridOptions = {
      cacheBlockSize: this.cacheBlockSize,
      columnDefs: this.getColumnDefs(),
      datasource: this.dataSource,
      defaultColDef: getDefaultColDef(),
      rowData: [],
      pagination: true,
      paginationPageSize: 20,
      rowHeight: this.utilityService.getAgGridRowHeight(),
      rowModelType: 'infinite',
      overlayNoRowsTemplate: 'There are no records to show'
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
  }

  private listenDataChanges(): void {
    this.appStore
      .select(getActiveDistributorPguid)
      .pipe(
        takeUntil(this.destroyed$),
        filter((distributorPguid) => distributorPguid !== 0)
      )
      .subscribe((distributorPguid: any) => {
        this.distributorPguid = distributorPguid;
      });

    this.appStore
      .select(getTaskDetails)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== null)
      )
      .subscribe((data: any) => {
        if (data) {
          this.taskDetails = JSON.parse(JSON.stringify(data));
        }
      });

    this.appStore
      .select(getRestatingSalesRoles)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((restatingSalesRoles: string[]) => {
        this.checkExceptionLeadPermission(restatingSalesRoles);
      });

    this.actions$.pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.SUBMIT_SALES_RECORD_SUCCESS)).subscribe(() => {
      this.submitRecordsSuccessHandler();
    });
  }

  private submitRecordsSuccessHandler() {
    this.gridApi?.setFilterModel(null);
    this.gridApi?.onFilterChanged();
  }

  private checkExceptionLeadPermission(restatingSalesRoles: string[]) {
    if (restatingSalesRoles) {
      this.hasExceptionLeadPermission = !!restatingSalesRoles.filter(
        (role: any) => role === 'Restating_ExceptionLead' || role === 'Restating_WFadmin'
      ).length;
    }
  }

  private getColumnDefs(): any {
    return [
      ...getColumnDefs(),
      {
        headerName: 'Action',
        field: 'status',
        pinned: 'right',
        cellRenderer: 'radioSelector',
        onCellValueChanged: (node) => {
          this.isEnabledSubmitButton = true;
        }
      }
    ];
  }

  onResetdata(): void {
    for (let i = this.gridOptions.api.getFirstDisplayedRow(); i <= this.gridOptions.api.getLastDisplayedRow(); i++) {
      const rowNode = this.gridOptions.api.getDisplayedRowAtIndex(i);
      rowNode.setData({ ...rowNode.data, ...{ status: 'N' } });
    }
  }

  onAceeptall(): void {
    for (let i = this.gridOptions.api.getFirstDisplayedRow(); i <= this.gridOptions.api.getLastDisplayedRow(); i++) {
      const rowNode = this.gridOptions.api.getDisplayedRowAtIndex(i);
      rowNode.setData({ ...rowNode.data, ...{ status: 'A' } });
      this.isEnabledSubmitButton = true;
    }
  }

  onRejectall(): void {
    for (let i = this.gridOptions.api.getFirstDisplayedRow(); i <= this.gridOptions.api.getLastDisplayedRow(); i++) {
      const rowNode = this.gridOptions.api.getDisplayedRowAtIndex(i);
      rowNode.setData({ ...rowNode.data, ...{ status: 'R' } });
      this.isEnabledSubmitButton = true;
    }
  }

  openNoDataDialog() {
    const message = `There is no records  for this distributor.
    <br>Please click on 'OK' to complete this task.`;
    const dialogData = new DialogModel(message);
    this.modalRef = this.modalService.open(ModelDialogueComponent, {
      width: '600px',
      data: dialogData
    });
    this.modalRef.afterClosed().subscribe((data: any) => {
      data && this.completeTask();
    });
  }

  submitRecords() {
    this.submitedRecordLength = this.getSelectedData().length;
    this.store.dispatch(new SubmitSalesRecord(this.getSelectedData()));
  }

  private getSelectedData(): any {
    return this.getAllRows().filter((item: any) => item?.status === 'A' || item?.status === 'R');
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private getSalesRecords(params: any, payload: any) {
    if (this.gridApi && this.distributorPguid) {
      this.isEnabledSubmitButton = false;
      this.gridApi.showLoadingOverlay();
      this.salesRestateService.getAllRestateRecords(payload).subscribe({
        next: (data) => {
          this.SalesRecordsSuccessHandler(data, params);
        },
        error: (error) => {
          const message = error.error && error.error.message ? error.error.message : 'An error occured while fetching the records';
          this.messageService.open(message, 'Close');
          params.failCallback();
          this.gridOptions.api.showNoRowsOverlay();
        }
      });
    }
  }

  private SalesRecordsSuccessHandler(data: any, params: any): void {
    this.updateGrid(data, params);
    const totalRecords = data.totalRecords ? data.totalRecords : 0;
    if (!this.getSearchCriteria(params.filterModel).length) {
      this.totalRecords = totalRecords;
      if (!totalRecords) {
        this.gridApi.showNoRowsOverlay();
        if (this.taskDetails.status !== 'COMPLETED') {
          this.openNoDataDialog();
        }
      }
    }
  }

  private completeTask(): void {
    this.appStore.dispatch(
      new UpdateTaskDetails({
        ...this.taskDetails,
        status: 'COMPLETED',
        action: 'UPDATE'
      })
    );
  }

  private updateGrid(data: any, params: any): void {
    let totalRecords = 0;
    let salesRestateList = [];
    if (data.salesRestateList.length) {
      salesRestateList = data.salesRestateList;
      totalRecords = data.totalRecords;
      this.gridApi.hideOverlay();
    } else {
      this.gridOptions.api.showNoRowsOverlay();
    }
    params.successCallback(salesRestateList, totalRecords);
  }

  private getPayloadForSalesRestate(params) {
    return {
      distributorPguid: this.distributorPguid,
      limit: this.cacheBlockSize,
      offset: Math.floor(params.endRow - this.cacheBlockSize),
      searchCriteria: this.getSearchCriteria(params.filterModel),
      sortCriteria: this.getSortCriteria(params.sortModel)
    };
  }

  private getSearchCriteria(filterModel: any): any {
    const searchCriteria = [];
    if (filterModel) {
      for (const property in filterModel) {
        const columnName = property;
        const searchText = filterModel[property].filter;
        searchCriteria.push({ columnName, searchText });
      }
    }
    return searchCriteria;
  }
  private getSortCriteria(sortModel: any): any {
    const orderBy = sortModel.length ? sortModel[0].colId : 'itemKey';
    const sortBy = sortModel.length === 0 ? 'asc' : sortModel[0].sort;
    return [{ orderBy, sortBy }];
  }
}
