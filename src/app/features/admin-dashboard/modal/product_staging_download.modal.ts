import { searchCriteriaInternal } from '../store/reducers/common.reducer';

export const ProductStagingDownloadFilter = ():Array<searchCriteriaInternal> => [
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
    columnLabel: 'Product Brand Master',
    columnName: 'prod_brand_mastered',
    isSelected: false
  },
  {
    columnLabel: 'Current UNSPSC Code',
    columnName: 'current_unspsc_code',
    isSelected: false
  },
  {
    columnLabel: 'Current UNSPSC Desc',
    columnName: 'current_unspsc_desc',
    isSelected: false
  },
  {
    columnLabel: 'Product Conv Factor',
    columnName: 'prod_conv_factor',
    isSelected: false
  },
  {
    columnLabel: 'Analyst Name',
    columnName: 'unspsc_analyst_name',
    isSelected: false
  },
  {
    columnLabel: 'Analyst Comments',
    columnName: 'unspsc_comments',
    isSelected: false
  },
  {
    columnLabel: 'Created Date',
    columnName: 'created_date',
    isSelected: false
  },
  {
    columnLabel: 'Updated Date',
    columnName: 'updated_date',
    isSelected: false
  }
];
