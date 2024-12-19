import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { DialogModel, ModelDialogueComponent, AgGridTypeaheadComponent } from './../../../../shared/components';
import { MessageService } from './../../../../shared/services';
import { MatDialog } from '@angular/material/dialog';

import { FacilityTypeService } from '../../services/facility-type.service';
import { Subject } from 'rxjs';
import { ApplicationState, CommonActionsEnum, getUserProfile, UpdateTaskDetails, UserProfileState } from './../../../../store';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { UnMasteredContainer } from '../../containers/unmastered.container';

declare let jsonata: any;
@Component({
  selector: 'app-facility-type-unmantered-records',
  templateUrl: './unmastered.component.html',
  styleUrls: ['./unmastered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnmasteredComponent extends UnMasteredContainer implements OnInit, OnDestroy {
  @Input() taskDetails: any;
  @Input() distributorPguid: number;

  _mappings: any = [];

  @Input('mappings')
  set mappings(value: any) {
    this._mappings.push.apply(
      this._mappings,
      jsonata(`*.({"value": internalMappingDescription, "id": internalMappingId })`).evaluate(value)
    );
  }

  @Input('userProfile')
  set userProfile(value: UserProfileState) {
    this.updateUserProfileChanges(value);
  }

  frameworkComponents = {
    typeaheadEditor: AgGridTypeaheadComponent
  };

  private dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const payload = this.getPayloadForUnmasterList(params);
      this.gridApi.showLoadingOverlay();
      this.getUnmasteredRecords(params, payload);
    }
  } as IDatasource;

  constructor(
    private facilityTypeService: FacilityTypeService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    public readonly matDialog: MatDialog,
    protected actions$: Actions,
    private readonly appStore: Store<ApplicationState>
  ) {
    super();
  }

  gridOptions: GridOptions;
  isEnabledSubmitButton = false;
  isEnabledEscalateButton = false;
  updatedRecords = [];
  private gridApi: GridApi;
  private totalRecords: number;
  private totalMappedRecords = 0;
  private userName: string;
  private readonly destroyed$ = new Subject<boolean>();

  ngOnInit(): void {
    this.initGridOption();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.listenDataChanges();
    this.gridApi.sizeColumnsToFit();
    this.gridApi.showLoadingOverlay();
    this.updateColumnDefs();
  }

  submitRecords() {
    this.facilityTypeService.submitTask(this.getPayloadForSubmit()).subscribe({
      next: (data: any) => {
        this.submitRecordsSuccessHandler(data.message);
      },
      error: (error) => {
        const message = error.error && error.error.message ? error.error.message : 'An error occured while submiting the records';
        this.messageService.open(message, 'Close');
      }
    });
  }

  saveForLater() {
    this.facilityTypeService.saveForLater(this.getPayloadForSaveForLater()).subscribe({
      next: (data: any) => {
        this.saveForLaterSuccessHandler(data);
      },
      error: (error) => {
        const message = error.error && error.error.message ? error.error.message : 'An error occured while saving records';
        this.messageService.open(message, 'Close');
      }
    });
  }

  openEscalateDialog() {
    const message = `This task will be escalated to Exception Lead's approval.
    <br>Please click on 'OK' to escalate this task.`;
    const dialogData = new DialogModel(message);
    const modalRef = this.matDialog.open(ModelDialogueComponent, {
      width: '600px',
      data: dialogData
    });
    modalRef.afterClosed().subscribe((data: any) => {
      data && this.escalateTask();
    });
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

  updateUserProfileChanges(profile: any): void {
    this.userName = profile.fullName;
    this.checkExceptionLeadPermission(profile.faciliyTypeRoles);
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
    this.facilityTypeService.getTotalMappedRecordsCount(this.distributorPguid).subscribe({
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
      this.facilityTypeService.getUnmasteredRecords(payload).subscribe({
        next: (data) => {
          this.unmasteredRecordsSuccessHandler(data, params);
        },
        error: (error) => {
          const message =
            error.error && error.error.message ? error.error.message : 'An error occured while fetching the unmastered records';
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
    const orderBy = sortModel.length ? sortModel[0].colId : 'externalFacilityKey';
    const sortBy = sortModel.length === 0 ? 'asc' : sortModel[0].sort;
    return [{ orderBy, sortBy }];
  }

  private submitRecordsSuccessHandler(message: string) {
    this.updatedRecords = [];
    this.messageService.open(message || 'Records are submited successfully', 'Close');
    this.changeDetectorRef.detectChanges();
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
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

  private initGridOption(): void {
    this.gridOptions = {
      cacheBlockSize: this.cacheBlockSize,
      columnDefs: [],
      datasource: this.dataSource,
      defaultColDef: this.getDefaultColDef(),
      rowData: [],
      pagination: true,
      paginationPageSize: 20,
      rowHeight: 30,
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

  private resetUpdatedRecords(): void {
    this.updatedRecords = [];
    this.changeDetectorRef.detectChanges();
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

  private isUpdatedAllRecords(): boolean {
    return this.totalMappedRecords === this.totalRecords;
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

  private getPayloadForSaveForLater(): any {
    return {
      distributorPguid: this.distributorPguid,
      status: 'SaveForLater',
      masterData: this.normalizeMappingProperties(this.updatedRecords)
    };
  }

  private getPayloadForSubmit(): any {
    return {
      distributorPguid: this.distributorPguid,
      status: 'Completed',
      userName: this.userName,
      masterData: this.normalizeMappingProperties(this.getMappedUnmasteredData())
    };
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

  openNoDataDialog() {
    const message = `There is no unmastered records to master for this distributor.
    <br>Please click on 'OK' to complete this task.`;
    const modalRef = this.matDialog.open(ModelDialogueComponent, {
      width: '600px',
      data: new DialogModel(message)
    });
    modalRef.afterClosed().subscribe((data: any) => {
      data && this.completeTask();
    });
  }

  private addToUpdatedRecords(node: any) {
    if (this.isMappingExists(node.data)) {
      const index = this.updatedRecords.findIndex((item) => item.externalFacilityKey === node.data.externalFacilityKey);
      if (index >= 0) {
        this.updatedRecords[index] = node.data;
      } else {
        this.updatedRecords.push(node.data);
      }
      this.isEnabledSubmitButton = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  private updateColumnDefs(): void {
    const columnDefs = [
      { field: 'externalFacilityKey', headerName: 'Key', tooltipField: 'externalFacilityKey' },
      { field: 'externalFacilityDesc', headerName: 'Description', tooltipField: 'externalFacilityDesc', },
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
          mappingOptions: this._mappings
        },
        onCellValueChanged: (node) => {
          this.addToUpdatedRecords(node);
        },
        
      }
    ];
    this.gridApi.setColumnDefs(columnDefs);
    this.gridApi.sizeColumnsToFit();
  }

  private isMappingExists(item: any): boolean {
    return item.mapping && item.mapping.id && item.mapping.value;
  }

  private normalizeMappingProperties(records: any): any {
    return records.map((item) => {
      const values = item.mapping.value.split('|');
      return {
        facilityTypePguid: item.facilityTypePguid,
        externalFacilityKey: item.externalFacilityKey,
        externalFacilityDesc: item.externalFacilityDesc,
        facilityInternalId: item.mapping.id,
        internalFacilityGroupDesc: values[0].trim(),
        internalFacilitySubgroupDesc: values.length > 1 ? values[1].trim() : ''
      };
    });
  }
}
