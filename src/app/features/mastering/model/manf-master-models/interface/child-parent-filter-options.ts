import { InputType } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { CommonDateRangeSearch } from './common.search-options';

export const ChildParentFilterOptions = (): searchCriteriaInternal[] => [
  {
    columnName: 'child_manf_id',
    columnLabel: 'Child Manufacturer ID',
    isSelected: false
  },
  {
    columnName: 'child_manf_name',
    columnLabel: 'Child Manufacturer Name',
    isSelected: false
  },
  {
    columnName: 'child_display_name',
    columnLabel: 'Child Display Name',
    isSelected: false
  },
  {
    columnName: 'parent_manf_id',
    columnLabel: 'Parent Manufacturer ID',
    isSelected: false
  },
  {
    columnName: 'parent_manf_name',
    columnLabel: 'Parent Manufacturer Name',
    isSelected: false
  },
  {
    columnName: 'parent_display_name',
    columnLabel: 'Parent Display Name',
    isSelected: false
  },
  { columnName: 'top_parent_manf_id', columnLabel: 'Top Parent Manf ID', isSelected: false },
  { columnName: 'top_parent_manf_name', columnLabel: 'Top Parent Manf Name', isSelected: false },
  {
    columnName: 'top_parent_display_name',
    columnLabel: 'Top Parent Display Name',
    isSelected: false
  },
  {
    columnName: 'blacklist_flag',
    columnLabel: 'Blacklist Flag',
    isSelected: false,
    inputType: 'dropdown',
    dropdownValues: ['Y', 'N']
  },
  {
    columnName: 'child_manf_active',
    columnLabel: 'Is Child Active ?',
    isSelected: false,
    inputType: 'dropdown',
    dropdownValues: ['Y', 'N']
  },
  {
    columnName: 'child_manf_created_by',
    columnLabel: 'Created By',
    isSelected: false
  },
  {
    columnName: 'child_manf_updated_by',
    columnLabel: 'Updated By',
    isSelected: false
  },
  {
    columnLabel: 'Created Date',
    columnName: 'child_manf_created_date',
    isSelected: false,
    inputType: InputType.RangeDatepicker,
    isContainSearch: true
  },
  {
    columnLabel: 'Updated Date',
    columnName: 'child_manf_updated_date',
    isSelected: false,
    inputType: InputType.RangeDatepicker,
    isContainSearch: true
  }
];
