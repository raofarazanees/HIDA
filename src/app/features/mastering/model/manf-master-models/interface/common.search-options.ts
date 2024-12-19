import { InputType } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';

export const CommonCreateUpdateOptions = (isForDate:boolean = true):searchCriteriaInternal[] => [
{ columnLabel: 'Created By', columnName: 'created_by', isSelected: false, inputType: InputType.Text },
{ columnLabel: 'Updated By', columnName: 'updated_by', isSelected: false, inputType: InputType.Text },
{ columnLabel: 'Created Date', columnName: 'created_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch:true },
{ columnLabel: 'Updated Date', columnName: 'updated_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch:true },
]

export const CommonDateRangeSearch = (text = ''): searchCriteriaInternal[] => [
  {
    columnLabel: `${text}Created Date`,
    columnName: 'created_date',
    isSelected: false,
    inputType: InputType.RangeDatepicker,
    isContainSearch: true
  },
  {
    columnLabel: `${text}Updated Date`,
    columnName: 'updated_date',
    isSelected: false,
    inputType: InputType.RangeDatepicker,
    isContainSearch: true
  }
];