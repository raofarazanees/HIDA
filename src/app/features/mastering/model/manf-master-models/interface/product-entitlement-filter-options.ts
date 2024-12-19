import { InputType } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { DefaultYesNoValues } from './unspsc-master-filter-options';
import { CommonCreateUpdateOptions } from './common.search-options';

export const ProductEntitlementSearch = (): searchCriteriaInternal[] => [
    { columnLabel: 'UNSPSC Code', columnName: 'unspsc_code', isSelected: false },
    { columnLabel: 'UNSPSC Description', columnName: 'unspsc_description', isSelected: false },
    { columnLabel: 'Product ID', columnName: 'product_id', isSelected: false },
    { columnLabel: 'Product Description', columnName: 'prod_desc', isSelected: false },
    { columnLabel: 'Product SKU', columnName: 'prod_sku', isSelected: false },
    { columnLabel: 'Child Manf ID', columnName: 'manf_id', isSelected: false },
    { columnLabel: 'Child Manufacturer Name', columnName: 'manf_name', isSelected: false },
    { columnLabel: 'Child Display Name', columnName: 'child_display_name', isSelected: false },
    { columnLabel: 'Parent Manf ID', columnName: 'parent_manf_id', isSelected: false },
    { columnLabel: 'Parent Manf Name', columnName: 'parent_manf_name', isSelected: false },
    { columnLabel: 'Parent Display Name', columnName: 'parent_display_name', isSelected: false },
    { columnLabel: 'Top Parent Manf ID', columnName: 'top_parent_manf_id', isSelected: false },
    { columnLabel: 'Top Parent Manf Name', columnName: 'top_parent_manf_name', isSelected: false },
    { columnLabel: 'Top Parent Display Name', columnName: 'top_parent_display_name', isSelected: false },
    { columnLabel: 'UNSPSC Datasource', columnName: 'unspsc_datasource', isSelected: false },
    { columnLabel: 'UNSPSC Flag', columnName: 'unspsc_flag', isSelected: false },
    { columnLabel: 'UNSPSC Updated By', columnName: 'unspsc_updated_by', isSelected: false },
    { columnLabel: 'UNSPSC Updated Date', columnName: 'unspsc_updated_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch: true },
    { columnLabel: 'Revenue', columnName: 'revenue', inputType: InputType.RangeInput, isContainSearch: true, isAllowNull: true, isAllowFloat: true },
    { columnLabel: 'Market ID', columnName: 'market_id', isSelected: false },
    { columnLabel: 'Market Name', columnName: 'market_name', isSelected: false },
    { columnLabel: 'Submarket Name', columnName: 'submarket_name', isSelected: false },
    // { columnLabel: 'Brand ID', columnName: 'br_map_id_name', isSelected: false },
    { columnLabel: 'Brand Name', columnName: 'br_map_id_name_', isSelected: false },
    { columnLabel: 'Custom Flag', columnName: 'prod_ctm_flag', isSelected: false, inputType: InputType.Select, dropdownValues: ['', ...DefaultYesNoValues] },
    { columnLabel: 'Private Flag', columnName: 'prod_pvt_flag', isSelected: false, inputType: InputType.Select, dropdownValues: ['', ...DefaultYesNoValues] },
    { columnLabel: 'KPT Flag', columnName: 'prod_kpt_flag', isSelected: false, inputType: InputType.Select, dropdownValues: ['', ...DefaultYesNoValues] },
    { columnLabel: 'Comments', columnName: 'comments', isSelected: false },
    { columnLabel: 'Checked Status', columnName: 'checked_status', isSelected: false, inputType: InputType.Select, dropdownValues: ['', 'IN', 'OUT'], isAllowNull: true },
    { columnLabel: 'Checked Out User Name', columnName: 'checked_out_user_name', isSelected: false },
    { columnLabel: 'Checked Out User Email', columnName: 'checked_out_user_email', isSelected: false },
    { columnLabel: 'Checked Out Date', columnName: 'checked_out_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch: true },
    { columnLabel: 'Checked In User Name', columnName: 'checked_in_user_name', isSelected: false },
    { columnLabel: 'Checked In User Email', columnName: 'checked_in_user_email', isSelected: false },
    { columnLabel: 'Checked In Date', columnName: 'checked_in_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch: true },
    ...CommonCreateUpdateOptions()
]