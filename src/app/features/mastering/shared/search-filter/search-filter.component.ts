import { InputType, ProductSearchCriteria, searchCriteriaInternal } from './../../../admin-dashboard/store/reducers/common.reducer';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { initialState } from '../../model/manf-master-models/interface/manf-master.interface';
import { MasteredTabSearchFormAction } from '../../store/actions';
import { manfMasterState } from '../../store/reducers';
import { MatCalendarCellCssClasses, MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { numberToMonth } from 'src/app/features/admin-dashboard/modal/product-graph_merged-constants';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MM_YYYY_FORMATS } from 'src/app/features/admin-dashboard/components/side-nav-components/product-graph-merged-download-dialog/product-graph-merged-download-dialog.component';
import * as moment from 'moment';

enum containSearch {
  RANGE = 'Range',
  EQUALS = 'Equals'
}

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Input() totalRecords: string | number = 0;
  @Input() userName: string;
  @Input() email: string;
  @Output() initSearch = new EventEmitter<ProductSearchCriteria>();
  @Output() openDialog = new EventEmitter();
  @Output() exportFileEmit = new EventEmitter();
  @Input() addBtnText: string;
  @Input() exportBtnText: string;
  @Input() toolTipText: string = '';
  public readonly destroyed$ = new Subject<boolean>();
  searchFormGroup!: FormGroup;
  @Input() searchCriteriaOptionsData: searchCriteriaInternal[];
  searchCriteriaData: any[] = [];
  selectDropdownValue: searchCriteriaInternal;
  maxDate: Date = new Date();
  containSearchType: string[] = [containSearch.EQUALS, containSearch.RANGE];

  constructor(private fb: FormBuilder, private readonly store: Store<manfMasterState>, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      searchCondition: [initialState.masteredTabSearchFormState.searchCondition, []],
      searchText: [initialState.masteredTabSearchFormState.searchText],
      minValue: [initialState.masteredTabSearchFormState.minValue, [Validators.pattern('^[0-9-.]*$'), CustomValidator.numeric]],
      maxValue: [initialState.masteredTabSearchFormState.maxValue, [Validators.pattern('^[0-9-.]*$'), CustomValidator.numeric]],
      columnName: [initialState.masteredTabSearchFormState.columnName, []],
      containSearch: [initialState.masteredTabSearchFormState.containSearch, []],
      dateRange: ['']
    });
    this.searchFormGroup.valueChanges.subscribe((values) => {
      this.selectDropdownValue = null;
      if (values.columnName) {
        this.getColumnDetailsById(this.searchFormGroup.value, true);
      }

      this.store.dispatch(MasteredTabSearchFormAction(values));
    });

    setTimeout(() => {
      this.searchRecords();
    }, 30);
  }

  dateSelectedPicker(event: MatDatepickerInputEvent<Date>, picker: MatDatepicker<any>) {
    const date_ = `${numberToMonth[new Date(event.value).getMonth()]}-${new Date(event.value).getFullYear()}`;
    this.searchFormGroup.setValue({ ...this.searchFormGroup.value, searchText: date_ });
    this.cd.detectChanges();
    //picker.close();
  }

  dateSelected(normalizedMonthAndYear: moment.Moment, picker: MatDatepicker<any>) {
    const date_ = `${numberToMonth[normalizedMonthAndYear.month()]}-${normalizedMonthAndYear.year()}`;
    this.searchFormGroup.setValue({ ...this.searchFormGroup.value, searchText: date_ });
    this.cd.detectChanges();
    picker.close();
  }

  dateRangeSelected($event) { }
  remove(item): void {
    let columnName = item.columnName;
    if (item?.alternetName === 'br_map_id_name_') {
      columnName = 'br_map_id_name_';
    }
    const index = this.searchCriteriaData.findIndex((val) => val.columnName == columnName);
    if (index >= 0) {
      this.searchCriteriaData.splice(index, 1);
      this.toggleSelectedFilterOption();
      if (this.searchCriteriaData.length == 0) {
        this.searchRecords();
      } else {
        return;
      }
    } else {
      return;
    }
  }

  addSearchCriteria() {
    const columnName = ['display_name', 'comments', 'created_date', 'updated_date', 'last_reviewed_date', 'map_created_date', 'map_updated_date', 'child_manf_updated_date', 'child_manf_created_date', 'unspsc_updated_date', 'checked_in_date', 'checked_out_date'];

    if (!this.selectDropdownValue) {
      return false;
    }

    if (
      this.selectDropdownValue &&
      this.selectDropdownValue.isContainSearch &&
      this.selectDropdownValue.inputType === InputType.RangeInput &&
      this.searchFormGroup.value.containSearch === containSearch.RANGE
    ) {
      const { minValue, maxValue } = this.searchFormGroup.value;
      if (minValue && maxValue && Number(minValue) < Number(maxValue)) {
        this.searchFormGroup.patchValue({ searchText: `${minValue}||${maxValue}` });
      } else {
        return false;
      }
    }

    if (this.selectDropdownValue.inputType === InputType.RangeDatepicker) {
      if (typeof this.searchFormGroup.value.dateRange === 'string') {
        return false;
      }
    }

    if (
      this.selectDropdownValue?.isAllowNull ||
      columnName.includes(this.searchFormGroup.value.columnName) ||
      (this.searchFormGroup.value.searchText && this.searchFormGroup.value.columnName)
    ) {
      this.getColumnDetailsById(this.searchFormGroup.value);
      this.searchFormGroup.reset({ searchCondition: this.searchFormGroup.value.searchCondition, containSearch: containSearch.EQUALS });
      this.toggleSelectedFilterOption();
    } else {
      return false;
    }
  }

  searchRecords() {
    const deepCopy = JSON.parse(JSON.stringify(this.searchCriteriaData));

    const data = deepCopy.map((el) => {
      // if (el.inputType === 'datepicker') {
      //   el.searchText = el.completeDate ? moment(el.completeDate, 'MMM-YYYY').format('MM_YYYY') : '';
      //   return { columnName: el.columnName, searchText: el.searchText, completeDate: el.completeDate };
      // }
      if (el?.alternetName === 'br_map_id_name_') {
        el.columnName = 'br_map_id_name';
      }

      if (el?.alternetName === 'br_map_id_name_') {
        el.columnName = 'br_map_id_name'
      }

      return { columnName: el.columnName, searchText: el.searchText };
    });
    const dataToPost: ProductSearchCriteria = {
      searchCondition: this.searchFormGroup.value.searchCondition,
      searchCriteria: data,
      initiatedByUserName: this.userName
    };

    this.initSearch.emit(dataToPost);
  }

  openDialog_() {
    this.openDialog.emit();
  }

  exportBtnClicked() {
    const deepCopy = JSON.parse(JSON.stringify(this.searchCriteriaData));

    const data = deepCopy.map((el) => {
      // if (el.inputType === 'datepicker') {
      //   el.searchText = el.completeDate ? moment(el.completeDate, 'MMM-YYYY').format('MM_YYYY') : '';
      //   return { columnName: el.columnName, searchText: el.searchText, completeDate: el.completeDate };
      // }
      if (el?.alternetName === 'br_map_id_name_') {
        el.columnName = 'br_map_id_name';
      }

      if (el?.alternetName === 'br_map_id_name_') {
        el.columnName = 'br_map_id_name'
      }

      return { columnName: el.columnName, searchText: el.searchText };
    });
    debugger;
    const dataToPost: ProductSearchCriteria = {
      searchCondition: this.searchFormGroup.value.searchCondition,
      searchCriteria: data,
      initiatedByUserName: this.userName,
      initiatedByUserEmail: this.email
    };

    this.exportFileEmit.emit(dataToPost);
  }

  validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (this.selectDropdownValue.isAllowFloat) {
      if (charCode === 46 || charCode === 45) {
        return true;
      }
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      return 'hide-date';
    };
  }
  resetValue() {
    this.searchFormGroup.patchValue({ searchText: '', minValue: null, maxValue: null, dateRange: '' });
  }

  private getColumnDetailsById(formValue, _isSelected = false) {
    const columnData: searchCriteriaInternal[] = this.searchCriteriaOptionsData.filter((el) => {
      return el.columnName === formValue.columnName;
    });
    if (!_isSelected) {
      // if (columnData[0]?.inputType === 'datepicker') {
      //   columnData[0].completeDate = formValue.searchText;
      // }

      if (formValue.columnName === 'br_map_id_name_') {
        columnData[0].alternetName = 'br_map_id_name_';
      }

      if (columnData[0]?.inputType === 'rangePicker') {
        const date = this.searchFormGroup.value.dateRange;
        columnData[0].dateRange = date;
        if (!date.begin) {
          formValue.searchText = `${moment(date).format('YYYY-MM-DD')}`;
        } else {
          formValue.searchText = `${moment(date.begin).format('YYYY-MM-DD')}||${moment(date.end).format('YYYY-MM-DD')}`;
        }
      }

      columnData[0].searchText = formValue.searchText ? formValue.searchText : '';
      this.searchCriteriaData = [...this.searchCriteriaData, ...columnData];
    } else {
      this.selectDropdownValue = columnData[0];
    }
  }

  private toggleSelectedFilterOption() {
    this.searchCriteriaOptionsData.forEach((element) => {
      const found = this.searchCriteriaData.some((el) => {
        return el.columnName === element.columnName;
      });
      found ? (element.isSelected = true) : (element.isSelected = false);
    });
  }

  get containsSearchType(): any {
    return this.searchFormGroup.get('containSearch').value;
  }

  get checkIsRange(): any {
    return this.searchFormGroup.get('containSearch').value === containSearch.EQUALS ? false : true;
  }

  getString(str) {
    if (str.includes('||')) {
      return str.replace('||', ',')
    }
    return str
  }
}

export class CustomValidator {
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9_.]+(\.?[0-9_.]+)?$/)) return { invalidNumber: true };

    return null;
  }
}
