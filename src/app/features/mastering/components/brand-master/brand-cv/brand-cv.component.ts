import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ProductSearchCriteria, searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { BrandMasterState } from '../../../store/reducers';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { BrandCVRecord, BrandCVResponse, BrandCvSearchOptions, BrandSourceRecord } from '../../../model/manf-master-models/interface/brand-cv-filter-options';
import { BrandCVGridOptions } from '../../../model/manf-master-models/ag-grid-columns/brand-cv-column.utils';
import { GetBrandCVRecordChangeLog, GetBrandCVRecords, UpdateBrandMasterRecords } from '../../../store/actions/brand-master.actions';
import { GetBrandMasterCVRecords, GetBrandSourceRecords } from '../../../store/selectors/brand-master.selector';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CreateBrandCvComponent } from './create-brand-cv/create-brand-cv.component';
import { updatedByModel } from 'src/app/model/staging-curation/create-update.interface';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { BrandCVChangeLogGrid } from '../../../model/manf-master-models/ag-grid-columns/brand-cv-changelog.utils';
import { CreateChildManfMasterComponent } from '../../manufacture-master-search/create-child-manf-master/create-child-manf-master.component';
import { GetAllActiveChildManf, GetBrandSource } from '../../../store/actions';

@Component({
  selector: 'app-brand-cv',
  templateUrl: './brand-cv.component.html',
  styleUrls: ['./brand-cv.component.scss']
})
export class BrandCvComponent implements OnInit {
  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly: boolean;
  searchCriteriaOptionsData: searchCriteriaInternal[] = BrandCvSearchOptions();
  overlayLoadingForGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };
  public readonly destroyed$ = new Subject<boolean>();
  isChangeOnPage: boolean = true;
  gridOptions: GridOptions;
  BrandMasterDataRes: BrandCVResponse;
  fBrandMasterDataRef: BrandCVRecord[] = [];
  isNotingChangeOnPage: boolean = false;
  brandSourceRecords: BrandSourceRecord[] = [];

  constructor(public readonly store: Store<BrandMasterState>, private dialogRef: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.gridOptions =  BrandCVGridOptions(30, this,this.readOnly);
    this.store.dispatch(GetAllActiveChildManf());
    this.store.dispatch(GetBrandSource());
    this.getActiveBrandSources();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pageSize') && changes['pageSize'].previousValue) {
      this.gridApi.paginationSetPageSize(Number(changes['pageSize'].currentValue));
    } else {
      return true;
    }
  }
  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  searchBrandMasterRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.store.dispatch(GetBrandCVRecords({ payload: dataToPost }));
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.gridApi.sizeColumnsToFit();
    this.listenDataChanges();
  }

  openCreateBrandCvModel(): void {
    let dialogRef = this.dialogRef.open(CreateBrandCvComponent, {
      height: '400px',
      width: '650px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName }
    });
  }
  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedRecords: BrandUpdateModel = {
      updatedBy: this.userProfile?.userName,
      records: this.getModifiedRecords()
    };
    this.store.dispatch(UpdateBrandMasterRecords({ payload: editedRecords }));
  }

  @HostListener('click', ['$event.target'])
  public onClick(targetElement) {
    if (targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' || targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }

  openLogDialog(node) {
    this.store.dispatch(GetBrandCVRecordChangeLog({ payload: { brandID: node.data.brandID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'BrandMaster',
        title: 'Brand Master',
        subTitle: `Brand ID: ${node.data.brandID}`,
        data: node.data,
        agGridOptions: BrandCVChangeLogGrid()
      }
    });
  }

  private listenDataChanges() {
    this.store
      .select(GetBrandMasterCVRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: BrandCVResponse) => {
        if (item != null) {
          this.BrandMasterDataRes = JSON.parse(JSON.stringify(item));
          this.setDataInAgGrid(this.BrandMasterDataRes.records);
          this.fBrandMasterDataRef = item.records;
          this.getModifiedRecords();
        } else {
          this.setDataInAgGrid([]);
        }
      });
  }

  private setDataInAgGrid(item: BrandCVRecord[]) {
    if (item && item.length > 0) {
      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private updateValue(node) {
    if (typeof node.data.brandsource === 'object') {
      node.data.brandsource = node.data.brandsource.value;
    }
    const rowNode = this.gridApi.getRowNode(node.id);
    const data = this.fBrandMasterDataRef.find((record: BrandCVRecord) => record.brandID === node.data.brandID);
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

  private getModifiedRecords() {
    const allRows = this.getAllRows();
    const filterRecords = allRows
      .filter((item: BrandCVRecord) => item?.isModified && item.brandname && item.brandfamily )
      .map(({brandID, brandname, brandfamily, brandmodel, brandsource, brandfilter, manfasbrand, rejectedFlag }: BrandCVRecord) => ({
        brandID,
        brandname,
        brandfamily,
        brandmodel,
        brandsource,
        brandfilter,
        manfasbrand,
        rejectedFlag
      }));

    const data = allRows.filter((item) => item?.isModified && item?.isModified === true);
    this.isNotingChangeOnPage = filterRecords.length > 0 ? !(data.length === filterRecords.length) : true;

    return filterRecords;
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'brandname'
    });
  }

  private openParentChildDialog(node, text?: string) {
    this.dialogRef.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName, value: text, appendToId: node.rowIndex + 1, appendFor: 'productEntitlement' }
    });
  }

  private getActiveBrandSources() {
    this.store
      .select(GetBrandSourceRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: BrandSourceRecord[]) => {
        this.brandSourceRecords = item;
      });
  }
}


export interface BrandUpdateModel extends updatedByModel {
  records: BrandCVRecord[]
}