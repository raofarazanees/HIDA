import { ColumnApi, GridApi, GridOptions } from 'ag-grid-enterprise';
import { getUnmasteredColumnDefs, TaskType, UNSPSCSource } from '../modal/ag-grid.constants';
import { itemMasterMessages } from '../modal/item-master-messages.constants';
import { BaseContainer } from './base.container';

export class UnMasteredContainer extends BaseContainer {
  gridOptions: GridOptions;
  columnDefs: any = getUnmasteredColumnDefs();
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  userName: string;
  vendorName: string;
  autoSize: boolean = false;
  totalRecords: number;

  constructor() {
    super();
  }

  initGridOption(): void {
    this.gridOptions = {
      columnDefs: [],
      groupHeaderHeight: 30,
      headerHeight: 40,
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true
      },
      rowData: [],
      pagination: true,
      paginationPageSize: 20,
      rowHeight: this.gridRowHeight,
      overlayNoRowsTemplate: itemMasterMessages.noUnMasteredRecords,
      rowClassRules: { 'ag-row-modified': 'data.isModified' }
    };
  }

  clearUnspscObject(): any {
    return {
      unspscCode: 'N/A',
      segmentCode: '',
      segmentTitle: '',
      familyCode: '',
      familyTitle: '',
      classCode: '',
      classTitle: '',
      commodityCode: '',
      commodityTitle: '',
      internalItemKey: ''
    };
  }

  updateUserProfileChanges(profile: any): void {
    this.userName = profile.fullName;
    this.vendorName = profile.vendorName;
    this.checkExceptionLeadPermission(profile.itemMasterRoles);
  }

  normalizeMappingProperties(records: any): any {
    return records.map((item: any) => {
      return {
        ...item,
        resourceName: this.userName,
        vendor: this.vendorName,
        unspscAttributes: JSON.stringify(item.unspscAttributes || []),
        ...this.getUnspscPropertiesForDsReRcAndCc(item)
      };
    });
  }

  isUpdatedAllRecords(): boolean {
    return this.getSavedUnmasteredData().length === this.totalRecords;
  }

  isSubmitedAllRecords(): boolean {
    return this.getAllConfirmedData().length === this.totalRecords;
  }

  getSavedUnmasteredData(): any {
    return this.getAllRows().filter((item: any) => this.isMappingExists(item) && this.isAmbiguityFlagExists(item));
  }

  getAllConfirmedData(): any {
    return this.getAllRows().filter((item: any) => this.isMappingExists(item) && item.ambiguityFlag === 'Confirmed');
  }

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  autoSizeAll(): void {
    if (this.autoSize) {
      const allColumnIds = [];
      this.gridColumnApi.getAllColumns().forEach((column: any) => {
        allColumnIds.push(column.colId);
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds);
    } else {
      this.gridApi.sizeColumnsToFit();
    }
  }

  isMappingExists(item: any): boolean {
    if (item.clientCorrectionAction === 'Reject' || item.clientCorrectionAction === 'Override') {
      return !item.comments ? false : item.clientCorrectionAction === 'Reject' ? true : this.isUnspscCodeExists(item);
    }
    return this.isUnspscCodeExists(item);
  }

  isAmbiguityFlagExists(item: any): boolean {
    return this.isExceptionLead ? item.ambiguityFlag === 'Confirmed' : item.ambiguityFlag;
  }

  getDefaultUnspscCode(data: any, taskType: string): string {
    if (data.unspscCode) {
      return data.unspscCode;
    }
    if (taskType === TaskType.RC || taskType === TaskType.CC) {
      return null;
    }
    if (data.dsUnspscId && !data.reUnspscId) {
      return data.dsConfidenceScore > 0.75 ? data.dsUnspscId.substring(0, 6) + '00' : data.dsUnspscId.substring(0, 4) + '0000';
    }
    if (data.reUnspscId && !data.dsUnspscId) {
      return data.reUnspscId.substring(0, 4) + '0000';
    }
    if (data.dsUnspscId && data.reUnspscId) {
      return data.dsUnspscId === data.reUnspscId
        ? data.dsUnspscId
        : data.dsUnspscId.substring(0, 6) === data.reUnspscId.substring(0, 6)
        ? data.dsUnspscId.substring(0, 6) + '00'
        : data.dsUnspscId.substring(0, 4) === data.reUnspscId.substring(0, 4)
        ? data.dsUnspscId.substring(0, 4) + '0000'
        : data.dsUnspscId.substring(0, 2) === data.reUnspscId.substring(0, 2)
        ? data.dsUnspscId.substring(0, 2) + '000000'
        : null;
    }
    return null;
  }

  prepareGridData(data: any): any {
    if (this.isExceptionLead && data) {
      return JSON.parse(JSON.stringify(this.updateNoUnspscFoundAsEmpty(data)));
    }
    return JSON.parse(JSON.stringify(data));
  }

  clearModifiedFlag(): void {
    this.gridApi.forEachNode((rowNode) => {
      rowNode.setData({ ...rowNode.data, ...{ isModified: false } });
    });
  }

  getReclassificationSaveForLaterPayload(updatedRecords: any) {
    return this.normalizeMappingProperties(updatedRecords).map((item) => {
      return { ...item, status: 'SaveForLater', isReclassified: 'Y', unspscSource: UNSPSCSource.RC };
    });
  }

  getClientCorrectionSaveForLaterPayload(updatedRecords: any) {
    return this.normalizeMappingProperties(updatedRecords).map((item) => {
      return { ...item, status: 'SaveForLater', isClientCorrected: 'Y', unspscSource: UNSPSCSource.CC };
    });
  }

  getReclassificationSubmitPayload() {
    return this.normalizeMappingProperties(this.getAllConfirmedData()).map((item) => {
      return { ...item, status: 'Completed', isReclassified: 'Y', unspscSource: UNSPSCSource.RC };
    });
  }

  getClientCorrectionSubmitPayload() {
    return this.normalizeMappingProperties(this.getAllConfirmedData()).map((item) => {
      return { ...item, status: 'Completed', isClientCorrected: 'Y', unspscSource: UNSPSCSource.CC };
    });
  }

  private updateNoUnspscFoundAsEmpty(data: any): any {
    return data.map((item) => {
      if (item.unspscCode === 'N/A' || item.ambiguityFlag === 'No UNSPSC found') {
        return { ...item, ...{ unspscCode: '', ambiguityFlag: '', unspscSource: '' } };
      }
      return item;
    });
  }

  private getUnspscPropertiesForDsReRcAndCc(item: any): any {
    if (
      item.unspscSource === UNSPSCSource.DS ||
      item.unspscSource === UNSPSCSource.RE ||
      item.unspscSource === UNSPSCSource.RC ||
      item.unspscSource === UNSPSCSource.CC
    ) {
      let unspscHierarchy = null;
      let unspscCode = '';
      switch (item.unspscSource) {
        case UNSPSCSource.DS:
          unspscHierarchy = item.dsUnspscHierarchy;
          unspscCode = item.dsUnspscId;
          break;
        case UNSPSCSource.RE:
          unspscHierarchy = item.reUnspscHierarchy;
          unspscCode = item.reUnspscId;
          break;
        case UNSPSCSource.RC:
          unspscHierarchy = item.reclassifySuggestedUNSPSCHierarchy;
          unspscCode = item.reclassifySuggestedUNSPSC;
          break;
        case UNSPSCSource.CC:
          unspscHierarchy = item.unspscHierarchyForCC;
          unspscCode = item.unspscForCC;
          break;
      }
      try {
        unspscHierarchy = JSON.parse(unspscHierarchy) || {};
      } catch (error) {
        return {};
      }
      return {
        unspscCode,
        segmentCode: unspscHierarchy.segmentCode,
        segmentTitle: unspscHierarchy.segmentTitle,
        familyCode: unspscHierarchy.familyCode,
        familyTitle: unspscHierarchy.familyTitle,
        classCode: unspscHierarchy.classCode,
        classTitle: unspscHierarchy.classTitle,
        commodityCode: unspscHierarchy.commodityCode,
        commodityTitle: unspscHierarchy.commodityTitle,
        internalItemKey: unspscHierarchy.ontologyItemPguid
      };
    }
    return {};
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private isUnspscCodeExists(item: any): boolean {
    return (
      item.unspscCode ||
      item.unspscSource === UNSPSCSource.DS ||
      item.unspscSource === UNSPSCSource.RE ||
      item.unspscSource === UNSPSCSource.RC ||
      item.unspscSource === UNSPSCSource.CC
    );
  }
}
