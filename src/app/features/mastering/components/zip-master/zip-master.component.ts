import { ApplicationState } from './../../../../store/reducers/index';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { ProductSearchCriteria, searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { AgGridTypeaheadComponent, AgGridActionCellComponent, CheckboxButtonRendererComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { Store } from '@ngrx/store';
import {
  autoAssignMarketToRecord,
} from '../../store/actions';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import {
  MarketMasterModel,
} from '../../model/manf-master-models/interface/unspsc-master.interface';
import { MatDialog } from '@angular/material/dialog';
import { HistoryLogDialogComponent } from '../../history-log-dialog/history-log-dialog.component';
import { getWbDashboardRoles } from '@app-store';
import * as moment from 'moment';
import { GetZipColumns, ZipMasterFilterOptions } from '../../model/manf-master-models/interface/zip-master-filter-options';
import { GetZipChangeLog, GetZipMasterRecords, UpdateZipRecord } from '../../store/actions/zip-master.actions';
import { GetLoadingStateZip, GetZipMasterRecordsData } from '../../store/selectors/zip-master.selector';
import { ZipMasterResponseData, zipMasterState, ZipRecordInterface } from '../../model/manf-master-models/interface/zip-master.interface';
import { GetZipChangelogColumn } from '../../model/manf-master-models/ag-grid-columns/zip-master-records-changelog.utils';
import { updatedByModel } from 'src/app/model/staging-curation/create-update.interface';

@Component({
  selector: 'app-zip-master',
  templateUrl: './zip-master.component.html',
  styleUrls: ['./zip-master.component.scss']
})
export class ZipMasterComponent extends BaseContainer implements OnInit {
  loading$: Observable<boolean> = this.store.select(GetLoadingStateZip);
  searchCriteriaOptionsData: searchCriteriaInternal[] = ZipMasterFilterOptions();
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions = GetZipColumns(30, this);
  isNotingChangeOnPage: boolean = true;
  pagination: number = 0;
  public readonly destroyed$ = new Subject<boolean>();
  searchCriteriaReference: any;
  zipRecordsRef: ZipRecordInterface[] = [];
  zipRecordsData: ZipMasterResponseData;
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent,
    checkboxSelector: CheckboxButtonRendererComponent
  };
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100, 150, 200];
  isChangeOnPage: boolean = false;
  activeMarketRecords: MarketMasterModel[] = [];
  isReadOnlyAccess:boolean = false;
  constructor(private readonly store: Store<zipMasterState>, private cd: ChangeDetectorRef, private dialogRef: MatDialog,
    private readonly appStore: Store<ApplicationState>) {
    super();
    this.getLoggedInUserRoles()
  }

  ngOnInit() {
    this.userProfile = BaseContainer.prototype.userProfile;
  }

  ngOnDestroy() {
    this.gridApi.destroy();
    this.store.dispatch(autoAssignMarketToRecord({ payload: null }));
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  searchZipManfRecords(dataToPost: ProductSearchCriteria)  {
    this.searchCriteriaReference = dataToPost;
    this.store.dispatch(GetZipMasterRecords({ payload: dataToPost }));
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.paginationSetPageSize(20);
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenDataChanges();
    this.gridApi.showLoadingOverlay();
  }

  changePaginationSize(value) {
    this.pageSize = value === 0 ? 20 : value;
    this.gridApi.paginationSetPageSize(this.pageSize);
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: any = this.getModifiedRecords();
    this.store.dispatch(UpdateZipRecord({ payload: editedChanges }));
  }

  @HostListener('click', ['$event.target'])
  public onClick(targetElement) {
    if (
      targetElement.className == 'mat-chip-list' ||
      targetElement.className == 'btn-row-container' ||
      targetElement.className == 'ag-paging-panel ag-unselectable' ||
      targetElement.className == 'ag-center-cols-viewport'
    ) {
      this.gridApi.stopEditing();
    } else {
      return true;
    }
  }

  openLogDialog(node) {
    this.store.dispatch(GetZipChangeLog({ payload: { zip: node.data.zip } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'ZipMaster',
        title: 'Zip Master',
        //subTitle: `Zip Code: ${node.data.unspscCode}`,
        data: node.data,
        agGridOptions: GetZipChangelogColumn(30)
      }
    });
  }

  private checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel && grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    } else {
      return true;
    }
  }
  private listenDataChanges() {
    this.store
      .select(GetZipMasterRecordsData)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((item) => item != null)
      )
      .subscribe((item: ZipMasterResponseData) => {
        if (item != null) {
          const zipRecordsData = JSON.parse(JSON.stringify(item));
          this.zipRecordsData = {
            totalRecords: zipRecordsData.totalRecords,
            records: zipRecordsData.records.map((item) => {
              return { ...item, isReviewed: (item.lastReviewedDate && item.lastReviewedBy) ? 'Y' : '',lastReviewedDate: item.lastReviewedDate ? moment(item.lastReviewedDate).format('YYYY-MM-DD')+' 00:00:00' : '' };
            })
          };
          this.setDataInAgGrid(this.zipRecordsData.records);
          this.zipRecordsRef = JSON.parse(JSON.stringify(this.zipRecordsData.records));
          this.getModifiedRecords();
        }
      });
  }
  private setDataInAgGrid(item: any) {
    if (item && item.length > 0) {
      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private getModifiedRecords() {
    const filterRecords: ZipUpdateModel[] = this.getAllRows()
      .filter((item: ZipRecordInterface) => {
        if (item?.isModified && item?.isModified === true && item.zip) {
          return item;
        }
      })
      .map((item: ZipRecordInterface) => {
        return {
          zip: item.zip,
          stateAbbr: item.stateAbbr,
          stateDisplay: item.stateDisplay,
          displayName2: item.displayName2,
          active : item.active,
          createdBy: item.createdBy,
          updatedBy: this.userProfile?.userName,
          createdDate: item.createdDate,
          updatedDate : item.updatedDate,
          activeFlag: item.activeFlag,
          manueffectiveDate: item.manueffectiveDate,
          endDate: item.endDate
        };
      });

    if (filterRecords.length > 0) {
      const data = this.getAllRows().filter((item) => {
        if (item?.isModified && item?.isModified === true) {
          return item;
        }
      });
      this.isNotingChangeOnPage = !(data.length == filterRecords.length);
    } else {
      this.isNotingChangeOnPage = true;
    }
    return filterRecords;
  }

  private getAllRows(): ZipRecordInterface[] {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  // private checkIsReview(node) {
  //   const rowNode = this.gridApi.getRowNode(node.rowIndex);
  //   this.updateValue(rowNode);
  // }

  //called from ag grid update value
  private updateValue(node) {
    const data = this.zipRecordsRef.find((record) => record.zip === node.data.zip);
    this.gridApi.stopEditing();
    const rowNode = this.gridApi.getRowNode(node.rowIndex);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];

    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    const { isNewAdded, ...refDataObject } = data;
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);

    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.cd.markForCheck();
    this.getModifiedRecords();
  }

  // called from ag-grid
  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  private getLoggedInUserRoles() {
    this.appStore
      .select(getWbDashboardRoles)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((roles: string[]) => {
        //&&  roles.indexOf('Mastering_UNSPSC') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1
        if(roles.indexOf('Mastering_Zip_Read_Only') !== -1 &&  roles.indexOf('Mastering_Zip') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1) {
          this.isReadOnlyAccess = true;
          this.gridOptions = GetZipColumns(30, this, true)
        }
       });
  }
}


export interface ZipDataToUpdate extends updatedByModel {
  records: ZipUpdateModel[];
}
export interface ZipUpdateModel {
  zip: number;
  stateAbbr: number;
  stateDisplay: number;
  displayName2: string;
  active : string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate : string;
  activeFlag: string;
  manueffectiveDate: string;
  endDate: string;

}
