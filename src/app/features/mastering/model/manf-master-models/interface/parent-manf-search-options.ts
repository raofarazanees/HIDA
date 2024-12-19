import { InputType } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { CommonDateRangeSearch } from './common.search-options';

export const ParentManfSearchOptions = (): searchCriteriaInternal[] => [
  {
    columnName: 'pmanf_id',
    columnLabel: 'Parent Manufacturer ID',
    isSelected: false
  },
  {
    columnName: 'pmanf_name',
    columnLabel: 'Parent Manufacturer Name',
    isSelected: false
  },
  {
    columnName: 'active',
    columnLabel: 'Is Parent Active ?',
    isSelected: false,
    inputType: 'dropdown',
    dropdownValues: ['Y', 'N']
  },
  {
    columnName: 'created_by',
    columnLabel: 'Created By',
    isSelected: false
  },
  {
    columnName: 'updated_by',
    columnLabel: 'Updated By',
    isSelected: false
  },
  ...CommonDateRangeSearch()
];
