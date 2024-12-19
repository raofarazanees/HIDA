import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService, MessageService } from './../../../../../shared/services';

import { ItemMasterService } from '../../../services/item-master.service';
import { itemMasterMessages } from '../../../modal/item-master-messages.constants';

@Component({
  selector: 'app-unspsc-tableview',
  templateUrl: './unspsc-tableview.component.html',
  styleUrls: ['./unspsc-tableview.component.scss']
})
export class UnspscTableviewComponent implements OnInit {
  @Input() unspscCode: any;
  @Input() level: any;
  @Output() readonly onDialogClose: EventEmitter<any> = new EventEmitter<any>();

  gridOptions: GridOptions;
  formGroup: FormGroup;
  selectedRecord: any = undefined;

  private gridApi: GridApi;
  private cacheBlockSize = 100;
  public leveldata: any;

  private dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const payload = this.getPayloadForUnspscCode(params);
      this.getUnspscRecords(params, payload);
    }
  };

  constructor(
    private utilityService: UtilityService,
    private itemMasterService: ItemMasterService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initGridOption();
    this.formGroup = this.formBuilder.group({
      level: ['*'],
      fieldName: ['*'],
      searchText: ['']
    });
  }

  onSelectionChanged(event: any): void {
    this.selectedRecord = this.gridApi.getSelectedRows()[0];
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectClick(): void {
    const unspscCode = this.selectedRecord.level4
      ? this.selectedRecord.level4.code
      : this.selectedRecord.level3
      ? this.selectedRecord.level3.code
      : this.selectedRecord.level2
      ? this.selectedRecord.level2.code
      : this.selectedRecord.level1.code;

      console.log(unspscCode);
      if (unspscCode.slice(-2).toString() == '00') {
        this.messageService.showToast('Please select Level 4 / Commodity level UNSPSC', 'error');
        return;
      }

    this.onDialogClose.emit({
      unspscCode,
      segmentCode: this.selectedRecord.level1.code,
      segmentTitle: this.selectedRecord.level1.title,
      familyCode: this.selectedRecord.level2 ? this.selectedRecord.level2.code : '',
      familyTitle: this.selectedRecord.level2 ? this.selectedRecord.level2.title : '',
      classCode: this.selectedRecord.level3 ? this.selectedRecord.level3.code : '',
      classTitle: this.selectedRecord.level3 ? this.selectedRecord.level3.title : '',
      commodityCode: this.selectedRecord.level4 ? this.selectedRecord.level4.code : '',
      commodityTitle: this.selectedRecord.level4 ? this.selectedRecord.level4.title : '',
      internalItemKey: this.selectedRecord.itemPGUID
    });
  }

  searchHandler(): void {
    this.gridApi.onFilterChanged();
  }

  private initGridOption(): void {
    this.gridOptions = {
      cacheBlockSize: this.cacheBlockSize,
      columnDefs: this.getColumnDefs(),
      datasource: this.dataSource,
      defaultColDef: this.getDefaultColDef(),
      pagination: true,
      paginationPageSize: 50,
      rowData: [],
      rowHeight: this.utilityService.getAgGridRowHeight(),
      rowModelType: 'infinite',
      overlayNoRowsTemplate: itemMasterMessages.noRecordsFound,
      isExternalFilterPresent: this.isExternalFilterPresent,
      doesExternalFilterPass: this.doesExternalFilterPass
    };
  }

  private isExternalFilterPresent(): boolean {
    return true;
  }

  private doesExternalFilterPass(node: any): boolean {
    if (node.data.filedToBeFiltered.matches()) {
      return true;
    }
  }

  private getColumnDefs(): any {
    return [
      {
        field: 'level1',
        headerName: 'Segment',
        tooltipField: 'level1.title',
        filter: false,
        valueFormatter: (params: any) => (params.value ? params.value.code + ' | ' + params.value.title : '')
      },
      {
        field: 'level2',
        headerName: 'Family',
        tooltipField: 'level2.title',
        filter: false,
        valueFormatter: (params: any) => (params.value ? params.value.code + ' | ' + params.value.title : '')
      },
      {
        field: 'level3',
        headerName: 'Class',
        tooltipField: 'level3.title',
        filter: false,
        valueFormatter: (params: any) => (params.value ? params.value.code + ' | ' + params.value.title : '')
      },
      {
        field: 'level4',
        headerName: 'Commodity',
        tooltipField: 'level4.title',
        filter: false,
        valueFormatter: (params: any) => (params.value ? params.value.code + ' | ' + params.value.title : '')
      }
    ];
  }

  private getDefaultColDef(): any {
    return {
      sortable: true,
      filter: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['contains']
      },
      resizable: true
    };
  }

  private updateGrid(data: any, params: any): void {
    let lastRow = -1;
    let list = [];
    if (data.data.length) {
      list = data.data;
      lastRow = data.totalRecords <= params.endRow ? data.totalRecords : -1;
      this.gridApi.hideOverlay();
    } else {
      lastRow = 0;
      this.gridOptions.api.showNoRowsOverlay();
    }
    params.successCallback(list, lastRow);
  }

  private getUnspscRecords(params: any, payload: any) {
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
      this.itemMasterService.getAllUnspscRecords(payload).subscribe({
        next: (data) => {
          this.updateGrid(data, params);
        },
        error: (error) => {
          const message = error.error && error.error.message ? error.error.message : itemMasterMessages.errorWhileFetchingRecords;
          this.messageService.open(message, 'Close');
          params.failCallback();
          this.gridOptions.api.showNoRowsOverlay();
        }
      });
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  private getPayloadForUnspscCode(params: any): any {
    return {
      limit: this.cacheBlockSize,
      offset: Math.floor(params.endRow - this.cacheBlockSize),
      searchCriteria: this.getSearchCriteria(),
      sortCriteria: this.getSortCriteria(params.sortModel)
    };
  }

  private getSearchCriteria(): any {
    const searchCriteria = [];
    if (this.formGroup) {
      const fieldName = this.formGroup.controls.fieldName.value;
      const searchText = this.formGroup.controls.searchText.value;
      const level = this.formGroup.controls.level.value;
      searchCriteria.push({ fieldName, level, searchText });
    }
    return searchCriteria;
  }

  private getSortCriteria(sortModel: any): any {
    const orderBy = sortModel.length ? sortModel[0].colId : 'level1';
    const sortBy = sortModel.length === 0 ? 'asc' : sortModel[0].sort;
    return [{ orderBy, sortBy }];
  }
}
