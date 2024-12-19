import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApplicationState } from '@app-store';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { searchCriteriaInternal, ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { manfMasterState } from '../../../store/reducers';
import { GetParentColumnOptions } from '../../../model/manf-master-models/ag-grid-columns/parent-manf-column.constants';
import { ParentManfResponseData, parentManfData } from '../../../model/manf-master-models/interface/manf-master.interface';
import { GetParentManfRecords, UpdateParentManfRecords, getParentManfChangeLog } from '../../../store/actions';
import { getParentManfData } from '../../../store/selectors';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ParentManfSearchOptions } from '../../../model/manf-master-models/interface/parent-manf-search-options';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { AgGridActionCellComponent } from '@app-shared-components';
import { MatDialog } from '@angular/material/dialog';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { GetParentManfChangeLogGridOption } from '../../../model/manf-master-models/ag-grid-columns/parent-manf-changelog.constants';
import { CreateParentManfDialogComponent } from '../create-parent-manf-dialog/create-parent-manf-dialog.component';

@Component({
  selector: 'app-parent-manf-master',
  templateUrl: './parent-manf-master.component.html',
  styleUrls: ['./parent-manf-master.component.scss']
})
export class ParentManfMasterComponent implements OnInit, OnDestroy {
  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly:boolean;
  searchCriteriaOptionsData: searchCriteriaInternal[] = ParentManfSearchOptions();

  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions;
  pagination: number = 0;
  parentManfData: ParentManfResponseData;
  parentManfRecordsRef: parentManfData[];
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    actionCellRenderer: AgGridActionCellComponent
  };
  public readonly destroyed$ = new Subject<boolean>();
  isChangeOnPage: boolean = true;

  constructor(
    private readonly appStore: Store<ApplicationState>,
    private readonly store: Store<manfMasterState>,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.gridOptions =  GetParentColumnOptions(30, this, this.readOnly);

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pageSize') && changes['pageSize'].previousValue) {
      this.gridApi.paginationSetPageSize(Number(changes['pageSize'].currentValue));
    } else {
      return true
    }
  }
  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  listenDataChanges() {
    this.store
      .select(getParentManfData)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: ParentManfResponseData) => {
        if (item != null) {
          this.parentManfData = JSON.parse(JSON.stringify(item));
          this.setDataInAgGrid(this.parentManfData.records);
          this.parentManfRecordsRef = item.records;
          this.getModifiedRecords();
        }
      });
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.gridApi.sizeColumnsToFit();
    this.listenDataChanges();
  }

  searchParentManfRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.store.dispatch(GetParentManfRecords({ payload: dataToPost }));
  }

  getModifiedRecords() {
    const filterRecords: parentManfData[] = this.getAllRows()
      .filter((item: parentManfData) => {
        if (item?.isModified && item?.isModified === true) {
          return item;
        }
      })
      .map((item: any) => {
        return { active: item.active, parentManfID: item.parentManfID, parentManfName: item.parentManfName };
      });
    this.isChangeOnPage = !filterRecords.length;
    return filterRecords;
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: UpdateParentRecordsModel = {
      updatedBy: this.userProfile.userName,
      records: this.getModifiedRecords()
    };
    this.store.dispatch(UpdateParentManfRecords({ payload: editedChanges }));
  }

  openLogDialog(node) {
    this.store.dispatch(getParentManfChangeLog({ payload: { parentManfID: node.data.parentManfID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'ParentManf',
        title: 'Parent Manufacturer',
        subTitle: `${node.data.parentManfID}`,
        data: node.data,
        agGridOptions: GetParentManfChangeLogGridOption(30)
      }
    });
  }

  openCreateParentDialog() {
    let dialogRef = this.dialogRef.open(CreateParentManfDialogComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName }
    });
  }

  
  @HostListener('click', ['$event.target']) 
  public onClick(targetElement) {
    if(targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' ||  targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }

  private setDataInAgGrid(item: any) {
    if ( item && item.length > 0) {
      this.rowCount = item.length
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'parentManfName'
    });
  }

  private updateValue(node) {
    const rowNode = this.gridApi.getRowNode(node.id);
    const data = this.parentManfRecordsRef.find((record) => record.parentManfID === node.data.parentManfID);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];
    const { isNewAdded, ...refDataObject } = data;
    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);
    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.gridApi.stopEditing();
    this.cd.markForCheck();
    this.getModifiedRecords();
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }
}

export interface UpdateParentRecordsModel {
  updatedBy: string;
  records: parentManfData[];
}
