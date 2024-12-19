import { searchCriteriaInternal } from '../store/reducers/common.reducer';

export const searchCriteriaOptions: Array<searchCriteriaInternal> = [
  {
    columnLabel: 'Product ID',
    columnName: 'product_id',
    isSelected: false
  },
  {
    columnLabel: 'Product SKU',
    columnName: 'prod_sku',
    isSelected: false
  },
  {
    columnLabel: 'Product Desc',
    columnName: 'prod_desc',
    isSelected: false
  },
  {
    columnLabel: 'Product Manf',
    columnName: 'prod_manf',
    isSelected: false
  },
  {
    columnLabel: 'Product Parent Manf',
    columnName: 'prod_parent_manf',
    isSelected: false
  },
  {
    columnLabel: 'Product UNSPSC',
    columnName: 'prod_unspsc_code',
    isSelected: false
  },
  {
    columnLabel: 'Product UNSPSC Desc',
    columnName: 'prod_unspsc_desc',
    isSelected: false
  },
  {
    columnLabel: 'Product Brand',
    columnName: 'prod_brand',
    isSelected: false
  },
  {
    columnLabel: 'Product Conv Factor',
    columnName: 'prod_conv_factor',
    isSelected: false
  },
  {
    columnLabel: 'Attribute Type',
    columnName: 'attribute_type',
    isSelected: false
  },
  {
    columnLabel: 'Attribute Label',
    columnName: 'attribute_label',
    isSelected: false
  },
  {
    columnLabel: 'Attribute Comments',
    columnName: 'attribute_comments',
    isSelected: false
  },
  {
    columnLabel: 'Analyst Name',
    columnName: 'analyst_name',
    isSelected: false
  },
  {
    columnLabel: 'Created Month',
    columnName: 'month_year',
    isSelected: false
  }
];
