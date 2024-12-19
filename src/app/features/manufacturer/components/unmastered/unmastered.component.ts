import { ChangeDetectorRef, Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgGridTypeaheadComponent, DialogModel, ModelDialogueComponent } from './../../../../shared/components';
import { UtilityService, MessageService } from './../../../../shared/services';

import { ManufacturerService } from '../../services/manufacturer.service';
import { ApplicationState, CommonActionsEnum, UpdateTaskDetails, UserProfileState } from './../../../../store';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { getUnmasteredColumnDefs } from '../../modal/ag-grid.constants';
import { UnMasteredContainer } from '../../containers/unmastered.container';

declare let jsonata: any;

@Component({
  selector: 'app-manf-unmantered-records',
  templateUrl: './unmastered.component.html',
  styleUrls: ['./unmastered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnmasteredComponent extends UnMasteredContainer implements OnInit, OnDestroy {
  _mappings: any = [];

  get mappings() {
    return this._mappings;
  }
  @Input() set mappings(value: any) {
    this._mappings.push.apply(
      this._mappings,
      jsonata(`*.({"value": internalMappingDescription, "id": internalMappingId })`).evaluate(value)
    );
  }
  @Input() taskDetails: any;
  @Input() distributorPguid: number;
  @Input('userProfile')
  set userProfile(value: UserProfileState) {
    this.updateUserProfileChanges(value);
  }

  public modalRef: MatDialogRef<any>;

  frameworkComponents = {
    typeaheadEditor: AgGridTypeaheadComponent
  };

  gridOptions: GridOptions;
  gridApi: GridApi;
  mapeValueItems = [];
  updatedRecords = [];
  isEnabledSubmitButton = false;
  isEnabledEscalateButton = false;
  totalRecords: number;
  private totalMappedRecords = 0;
  private userName: string;
  private readonly destroyed$ = new Subject<boolean>();

  private dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const payload = this.getPayloadForUnmasterList(params);
      this.gridApi.showLoadingOverlay();
      this.getUnmasteredRecords(params, payload);
    }
  } as IDatasource;

  constructor(
    private manufacturerService: ManufacturerService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    public modalService: MatDialog,
    private utilityService: UtilityService,
    protected actions$: Actions,
    private readonly appStore: Store<ApplicationState>
  ) {
    super();
  }

  ngOnInit() {
    this.initGridOption();
  }

  initGridOption() {
    this.gridOptions = {
      cacheBlockSize: this.cacheBlockSize,
      columnDefs: [],
      datasource: this.dataSource,
      defaultColDef: this.getDefaultColDef(),
      rowData: [],
      pagination: true,
      paginationPageSize: 20,
      rowHeight: this.utilityService.getAgGridRowHeight(),
      rowModelType: 'infinite',
      overlayNoRowsTemplate: 'There is no unmastered records to show',
      onFilterChanged: () => {
        this.resetUpdatedRecords();
      },
      onSortChanged: () => {
        this.resetUpdatedRecords();
      }
    };
  }

  isUpdatedAllRecords() {
    return this.totalMappedRecords === this.totalRecords;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.listenDataChanges();
    this.gridApi.sizeColumnsToFit();
    this.gridApi.showLoadingOverlay();
    this.updateColumnDefs();
  }

  getPayloadForSaveForLater() {
    return {
      distributorPguid: this.distributorPguid,
      status: 'SaveForLater',
      masterData: this.normalizeMappingProperties(this.updatedRecords)
    };
  }

  manufacturerSaveForLater() {
    this.manufacturerService.saveForLater(this.getPayloadForSaveForLater()).subscribe({
      next: (data: any) => {
        this.saveForLaterSuccessHandler(data);
      },
      error: (error) => {
        const message = error.error && error.error.message ? error.error.message : 'An error occured while saving manufacturer records';
        this.messageService.open(message, 'Close');
      }
    });
  }

  openEscalateDialog() {
    const message = `This task will be escalated to Exception Lead's approval.
    <br>Please click on 'OK' to escalate this task.`;
    const dialogData = new DialogModel(message);
    this.modalRef = this.modalService.open(ModelDialogueComponent, {
      width: '600px',
      data: dialogData
    });
    this.modalRef.afterClosed().subscribe((data: any) => {
      data && this.escalateTask();
    });
  }

  manufacturerSubmitRecords() {
    this.manufacturerService.updateManufacturer(this.getPayloadForSubmit()).subscribe({
      next: (data: any) => {
        this.submitRecordsSuccessHandler(data.message);
      },
      error: (error) => {
        this.messageService.open('An error occured while updating the task', 'Close');
      }
    });
  }

  closeTaskOnForce() {
    const message = `Are you sure you want to <strong>Complete</strong> this task ?`;
    const dialogData = new DialogModel(message, true);
    this.modalRef = this.modalService.open(ModelDialogueComponent, {
      width: '600px',
      data: dialogData
    });
    this.modalRef.afterClosed().subscribe((data: any) => {
      data && this.completeTask();
    });
  }

  openNoDataDialog() {
    const message = `There is no unmastered records to master for this distributor.
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

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private listenDataChanges(): void {
    this.actions$.pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_TASK_DETAILS_FAIL)).subscribe((status) => {
      if (status === 'ESCALATED') {
        this.isEnabledEscalateButton = true;
      }
      if (status === 'COMPLETED') {
        this.isEnabledSubmitButton = true;
      }
    });
  }

  private updateUserProfileChanges(profile: any): void {
    this.userName = profile.fullName;
    this.checkExceptionLeadPermission(profile.manufacturerRoles);
  }

  private saveForLaterSuccessHandler(response: any) {
    this.updatedRecords = [];
    this.totalMappedRecords = response.totalMappedRecords;
    if (this.isUpdatedAllRecords() && !this.isEscalatedTask()) {
      this.isEnabledEscalateButton = true;
    }
    this.changeDetectorRef.detectChanges();
    this.messageService.open(response.message || 'Records are saved successfully', 'Close');
  }

  private escalateTask(): void {
    this.appStore.dispatch(
      new UpdateTaskDetails({
        ...this.taskDetails,
        status: 'ESCALATED',
        action: 'UPDATE'
      })
    );
  }

  private isEscalatedTask(): boolean {
    return this.taskDetails && this.taskDetails.status === 'ESCALATED';
  }

  private getTotalMappedRecordsCount() {
    this.manufacturerService.getTotalMappedRecordsCount(this.distributorPguid).subscribe({
      next: (data: any) => {
        this.totalMappedRecords = data.totalMappedRecords;
        if (this.isUpdatedAllRecords() && !this.isEscalatedTask()) {
          this.isEnabledEscalateButton = true;
          this.changeDetectorRef.detectChanges();
        }
      },
      error: (error) => {
        const message = error.error && error.error.message ? error.error.message : 'An error occured while fetching the record count';
        this.messageService.open(message, 'Close');
      }
    });
  }

  private unmasteredRecordsSuccessHandler(data: any, params: any): void {
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
    if (this.getMappedUnmasteredData().length) {
      this.isEnabledSubmitButton = true;
    }
    this.getTotalMappedRecordsCount();
    this.changeDetectorRef.detectChanges();
  }

  private getUnmasteredRecords(params: any, payload: any) {
    if (this.gridApi && this.distributorPguid) {
      this.isEnabledSubmitButton = false;
      this.gridApi.showLoadingOverlay();
      this.manufacturerService.getUnmasteredRecords(payload).subscribe({
        next: (data) => {
          this.unmasteredRecordsSuccessHandler(data, params);
        },
        error: (error) => {
          const message = error.error && error.error.message ? error.error.message : 'An error occured while fetching the mastered records';
          this.messageService.open(message, 'Close');
          params.failCallback();
          this.gridOptions.api.showNoRowsOverlay();
        }
      });
    }
  }

  private updateGrid(data: any, params: any): void {
    let totalRecords = 0;
    let list = [];
    if (data.list.length) {
      list = data.list;
      totalRecords = data.totalRecords;
      this.gridApi.hideOverlay();
    } else {
      this.gridOptions.api.showNoRowsOverlay();
    }
    params.successCallback(list, totalRecords);
  }

  private getPayloadForUnmasterList(params) {
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
    const orderBy = sortModel.length ? sortModel[0].colId : 'revenue';
    const sortBy = sortModel.length === 0 ? 'desc' : sortModel[0].sort;
    return [{ orderBy, sortBy }];
  }

  private resetUpdatedRecords(): void {
    this.updatedRecords = [];
    this.changeDetectorRef.detectChanges();
  }

  private completeTask() {
    this.appStore.dispatch(
      new UpdateTaskDetails({
        ...this.taskDetails,
        status: 'COMPLETED',
        action: 'UPDATE'
      })
    );
  }

  private getMappedUnmasteredData(): any {
    return this.getAllRows().filter((item) => {
      return this.isMappingExists(item);
    });
  }

  private getAllRows() {
    let rowData = [];
    this.gridApi.forEachNode((node) => {
      if (node.data) {
        rowData.push(node.data);
      }
    });
    return rowData;
  }

  private getPayloadForSubmit(): any {
    return {
      distributorPguid: this.distributorPguid,
      status: 'Completed',
      userName: this.userName,
      masterData: this.normalizeMappingProperties(this.getMappedUnmasteredData())
    };
  }

  private submitRecordsSuccessHandler(message: string) {
    this.updatedRecords = [];
    this.messageService.open(message || 'Records are submited successfully', 'Close');
    this.changeDetectorRef.detectChanges();
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }

  private addToUpdatedRecords(node: any) {
    if (this.isMappingExists(node.data)) {
      const index = this.updatedRecords.findIndex((item) => item.externalmanufacturerkey === node.data.externalmanufacturerkey);
      if (index >= 0) {
        this.updatedRecords[index] = node.data;
      } else {
        this.updatedRecords.push(node.data);
      }
      this.isEnabledSubmitButton = true;
      this.changeDetectorRef.detectChanges();
    }
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

  private updateColumnDefs(): void {
    const columnDefs = [
      ...getUnmasteredColumnDefs(),
      {
        field: 'mapping',
        headerName: 'Mapped Description',
        tooltipField: 'mapping.value',
        editable: true,
        sortable: false,
        filter: false,
        valueFormatter: (params) => (params.value && params.value.value ? params.value.value : '-'),
        cellClass: 'typeahead-editable-cell',
        cellEditor: 'typeaheadEditor',
        cellEditorParams: {
          mappingOptions: this.mappings
        },
        onCellValueChanged: (node) => {
          this.addToUpdatedRecords(node);
        }
      }
    ];
    this.gridApi.setColumnDefs(columnDefs);
    this.gridApi.sizeColumnsToFit();
  }

  private isMappingExists(item: any): boolean {
    return item.mapping && item.mapping.id && item.mapping.value;
  }

  private normalizeMappingProperties(records: any) {
    return records.map((item) => {
      return {
        externalManufacturerDesc: item.externalManufacturerDesc,
        externalManufacturerKey: item.externalManufacturerKey,
        manufacturerPguid: item.manufacturerPguid,
        manufacturerInternalId: item.mapping.id,
        revenue: item.revenue,
        internalManufacturerKey: '',
        internalManufacturerDesc: item.mapping.value
      };
    });
  }
}
