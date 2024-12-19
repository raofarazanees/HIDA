import { Component, Input, OnInit, ChangeDetectorRef, SimpleChanges, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ProductSearchCriteria, searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { manfMasterState, parentManfData } from '../../../model/manf-master-models/interface/manf-master.interface';
import { Store } from '@ngrx/store';
import { GetAllActiveManfRecords, GetChildParentManfRecords, GetChildParentManfRecordsSuccess, UpdateChildParentRecords, downloadParentChildRecordsCsv, getChildChangeLog } from '../../../store/actions';
import { GetChildParentColumnAgGrid } from '../../../model/manf-master-models/ag-grid-columns/child-parent-column.constants';
import { GetAllActiveParentManf, GetChildParentsManf } from '../../../store/selectors';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { ChildParentRecord, childParentManfResponse } from '../../../model/manf-master-models/interface/child-parent-manf.interface';
import { ChildParentFilterOptions } from '../../../model/manf-master-models/interface/child-parent-filter-options';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';
import { CreateChildManfMasterComponent } from '../create-child-manf-master/create-child-manf-master.component';
import { MatDialog } from '@angular/material/dialog';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { GetChildManfChangeLogGridOption } from '../../../model/manf-master-models/ag-grid-columns/child-parent-changelog-constants';
import { CreateParentManfDialogComponent } from '../create-parent-manf-dialog/create-parent-manf-dialog.component';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { UserInitiatedData } from 'src/app/features/admin-dashboard/modal/user-initiated-interface';

@Component({
  selector: 'app-parent-child-manf-master',
  templateUrl: './parent-child-manf-master.component.html',
  styleUrls: ['../parent-manf-master/parent-manf-master.component.scss']
})
export class ParentChildManfMasterComponent implements OnInit {
  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly:boolean;

  activeParentRecords: parentManfData[] = [];

  searchCriteriaOptionsData: searchCriteriaInternal[] = ChildParentFilterOptions();
  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions;
  pagination: number = 0;
  childParentManfRecord: any;
  public readonly destroyed$ = new Subject<boolean>();
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };

  childManfData: childParentManfResponse;
  childParentManfRecordsRef: ChildParentRecord[];
  isChangeOnPage: boolean = false;
  constructor(private cd: ChangeDetectorRef, private readonly store: Store<manfMasterState>, private dialogRef: MatDialog) {}

  ngOnDestroy(): void {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.gridOptions = GetChildParentColumnAgGrid(30, this,this.readOnly);

    this.store.dispatch(GetAllActiveManfRecords());
    this.listenActiveParentManfRecords();
  }

  listenActiveParentManfRecords() {
    this.store
      .select(GetAllActiveParentManf)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((r: parentManfData[]) => {
        if(r && this.activeParentRecords.length && (this.activeParentRecords.length != r.length)) {
          this.childManfData = {totalRecords:this.childManfData?.totalRecords || 0, records: this.childManfData ? this.getAllRows() : []};
          if(this.childManfData.records.length > 0) this.store.dispatch(GetChildParentManfRecordsSuccess({payload: this.childManfData}));
        }
        this.activeParentRecords = r;
      });
  }

  listenDataChanges() {
    this.store
      .select(GetChildParentsManf)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: childParentManfResponse) => {
        if (item != null) {
          this.childManfData = JSON.parse(JSON.stringify(item));
          this.setDataInAgGrid(this.childManfData.records);
          this.childParentManfRecordsRef = item.records;
          this.getModifiedRecords();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pageSize') && changes['pageSize'].previousValue) {
      this.gridApi.paginationSetPageSize(Number(changes['pageSize'].currentValue));
    } else {
      return false;
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.listenDataChanges();
    this.checkDeviceWithAndFitColumn(this.gridApi)
  }

  checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  searchChildParentManfRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.store.dispatch(GetChildParentManfRecords({ payload: dataToPost }));
  }

  getModifiedRecords() {
    const allRowsData = this.getAllRows();

    const filterRecords: ChildParentRecord[] = allRowsData
      .filter((item: ChildParentRecord) => {
        if (item?.isModified && item?.isModified === true && item.childDisplayName.trim() ) {
          return item;
        }
      })
      .map((item: ChildParentRecord) => {
        return {
          childManfActive: item.childManfActive,
          parentManfID: item.parentManfID,
          childManfID: item.childManfID,
          childManfName: item.childManfName,
          blacklistFlag: item.blacklistFlag,
          childDisplayName: item.childDisplayName
        };
      });

    const data = allRowsData.filter((item) => item?.isModified);
    this.isChangeOnPage = filterRecords.length > 0 ? data.length !== filterRecords.length : true;
    return filterRecords;
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: updateDataToPost = {
      updatedBy: this.userProfile.userName,
      records: this.getModifiedRecords()
    };
    this.store.dispatch(UpdateChildParentRecords({ payload: editedChanges }));
  }

  openCreateChildDialog() {
    this.dialogRef.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName }
    });
  }

  openParentChildDialog(node,text:string) {
    this.dialogRef.open(CreateParentManfDialogComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName,parentName:text,appendToId:node.data.childManfID,appendFor:'parentChild' }
    });
  }

  openLogDialog(node) {
    this.store.dispatch(getChildChangeLog({ payload: { childManfID: node.data.childManfID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'ChildManf',
        title: 'Child Manufacturer',
        subTitle: `${node.data.childManfID}`,
        data: node.data,
        agGridOptions: GetChildManfChangeLogGridOption(30)
      }
    });
  }

  downloadParentChildFile(dataToPost: ProductSearchCriteria) {
    this.store.dispatch(downloadParentChildRecordsCsv({ payload: dataToPost }))
  }
  @HostListener('click', ['$event.target'])
  public onClick(targetElement) {
    if (targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' || targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }

  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'childManfName'
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
    this.cd.markForCheck();
  }

  private updateValue(node) {

    const data = this.childParentManfRecordsRef.find((record) => record.childManfID === node.data.childManfID);

    if (typeof node.data.parentManfName === 'object') {
      node.data.parentManfID = node.data.parentManfName.id;
      node.data.parentManfName = node.data.parentManfName.value;
      if (node.data.parentManfID !== data.parentManfID) {
        node.data.topParentManfID = '';
        node.data.topParentManfName = '';
      } else {
        node.data.topParentManfID = data.topParentManfID;
        node.data.topParentManfName = data.topParentManfName;;
      }
    }
    this.gridApi.stopEditing();
    const rowNode = this.gridApi.getRowNode(node.id);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];

    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));

    const { isNewAdded, ...refDataObject } = data;
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);

    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.cd.markForCheck();
    // this.childManfData = {totalRecords:this.childManfData.totalRecords,records:this.getAllRows()};
    // this.store.dispatch(GetChildParentManfRecordsSuccess({payload: this.childManfData}));
    this.getModifiedRecords();
  }

  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }
}

interface updateDataToPost {
  records: UpdateChildParentModel[] | any[];
  updatedBy: string;
}
export interface UpdateChildParentModel {
  blacklistFlag: string;
  childManfActive: string;
  childManfID: string;
  childManfName: string;
  parentManfID: string;
}
