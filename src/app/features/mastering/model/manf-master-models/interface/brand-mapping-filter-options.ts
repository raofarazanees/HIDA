import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { DefaultYesNoValues } from './unspsc-master-filter-options';
import { CommonCreateUpdateOptions } from './common.search-options';

export const BrandMappingSearchOptions = (): searchCriteriaInternal[] => [
    {
        columnName: 'brand_map_id',
        columnLabel: 'Brand Map ID',
        isSelected: false
      },
      {
        columnName: 'brand_id',
        columnLabel: 'Brand ID',
        isSelected: false
      },
      {
        columnName: 'brand_name',
        columnLabel: 'Brand Name',
        isSelected: false
      },
      {
        columnName: 'active',
        columnLabel: 'Is Map Active?',
        isSelected: false,
        inputType:'dropdown',
        dropdownValues:DefaultYesNoValues
      },
      {
        columnName: 'manf_id',
        columnLabel: 'Child Manf ID',
        isSelected: false
      },
      {
        columnName: 'manf_name',
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
        columnLabel: 'Parent Manf ID',
        isSelected: false
      },
      {
        columnName: 'parent_manf_name',
        columnLabel: 'Parent Manf Name',
        isSelected: false
      },
      {
        columnName: 'parent_display_name',
        columnLabel: 'Parent Display Name',
        isSelected: false
      },
      {
        columnName: 'top_parent_manf_id',
        columnLabel: 'Top Parent Manf ID',
        isSelected: false
      },
      {
        columnName: 'top_parent_manf_name',
        columnLabel: 'Top Parent Manf Name',
        isSelected: false
      },
      {
        columnName: 'top_parent_display_name',
        columnLabel: 'Top Parent Display Name',
        isSelected: false
      },
      {
        columnName: 'market_id',
        columnLabel: 'Market ID',
        isSelected: false
      },
      {
        columnName: 'market_name',
        columnLabel: 'Market Name',
        isSelected: false
      },
      {
        columnName: 'submarket_name',
        columnLabel: 'Submarket Name',
        isSelected: false
      },
      {
        columnName: 'comments',
        columnLabel: 'Comments',
        isSelected: false
      },
      ...CommonCreateUpdateOptions(false)
]