import { InputType, searchCriteriaInternal } from '../store/reducers/common.reducer';

export const searchCriteriaOptionsGraph = ():Array<searchCriteriaInternal> => [
  {
    columnName: 'product_id',
    columnLabel: 'Product ID',
    isSelected: false
  },
  {
    columnName: 'product_desc',
    columnLabel: 'Product Description',
    isSelected: false
  },
  {
    columnName: 'product_sku',
    columnLabel: 'Product OEM SKU',
    isSelected: false
  },
  {
    columnName: 'product_manf',
    columnLabel: 'Product OEM Name',
    isSelected: false
  },
  {
    columnName: 'product_parent_manf',
    columnLabel: 'Product Parent OEM Name',
    isSelected: false
  },
  {
    columnName: 'product_unspsc',
    columnLabel: 'Product UNSPSC',
    isSelected: false
  },
  {
    columnName: 'product_unspsc_desc',
    columnLabel: 'Product UNSPSC Description',
    isSelected: false
  },
  {
    columnLabel: 'Created Date',
    columnName: 'created_date',
    isSelected: false,
    inputType:InputType.RangeDatepicker,
    isContainSearch: true
  },
  {
    columnLabel: 'Last Modified Date',
    columnName: 'updated_date',
    isSelected: false,
    inputType:InputType.RangeDatepicker,
    isContainSearch: true
  }
];


export const numberToMonth  = {
  0 : 'Jan',
  1 : 'Feb',
  2 : 'Mar',
  3 : 'Apr',
  4 : 'May',
  5 : 'June',
  6 : 'July',
  7 : 'Aug',
  8 : 'Sep',
  9 : 'Oct',
  10 : 'Nov',
  11 : 'Dec'
}