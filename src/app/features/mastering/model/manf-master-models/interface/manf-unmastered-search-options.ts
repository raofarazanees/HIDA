import { InputType } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { DefaultYesNoValues } from './unspsc-master-filter-options';
import { CommonDateRangeSearch } from './common.search-options';

export const ManfUnmasteredSearchOptions = (): searchCriteriaInternal[] => [
{columnName:'manufacturer_pguid',columnLabel:'Manufacturer PGUID',isSelected:false},
{columnName:'distributor_pguid',columnLabel:'Distributor PGUID',isSelected:false},
{columnName:'distributor_name',columnLabel:'Distributor Name',isSelected:false},
{columnName:'ext_manf_key',columnLabel:'External Manf Key',isSelected:false},
{columnName:'ext_manf_desc',columnLabel:'External Manf Desc',isSelected:false},
{columnName:'revenue',columnLabel:'Revenue',isSelected:false,isContainSearch:true,isAllowNull:true,inputType:InputType.RangeInput,isAllowFloat:true},
...CommonDateRangeSearch()
]

export const MasteredSearchOptions = (allowNull = false, mapText = '', forAllRecords = false): searchCriteriaInternal[] => [
    {columnName:'manf_map_id',columnLabel:'Manufacturer Map ID',isSelected:false,isAllowNull:allowNull},
    {columnName:'manufacturer_pguid',columnLabel:'Manufacturer PGUID',isSelected:false},
    {columnName:'distributor_pguid',columnLabel:'Distributor PGUID',isSelected:false},
    {columnName:'distributor_name',columnLabel:'Distributor Name',isSelected:false},
    {columnName:'ext_manf_key',columnLabel:'External Manf Key',isSelected:false},
    {columnName:'ext_manf_desc',columnLabel:'External Manf Desc',isSelected:false},
    (forAllRecords && {columnLabel:'Is Mastered ?',columnName:'is_mastered',inputType:InputType.Select,dropdownValues:DefaultYesNoValues}),
    {columnLabel:'Revenue',columnName:'revenue',inputType:InputType.RangeInput,isContainSearch:true,isAllowNull:true,isAllowFloat:true},
    {columnName:'manf_id',columnLabel:'Child Manf ID',isSelected:false},
    {columnName:'manf_name',columnLabel:'Child Manf Name',isSelected:false},
    {columnName:'child_display_name',columnLabel:'Child Display Name',isSelected:false},
    {columnName:'pmanf_id',columnLabel:'Parent Manf ID',isSelected:false},
    {columnName:'pmanf_name',columnLabel:'Parent Manf Name',isSelected:false},
    {columnName:'parent_display_name',columnLabel:'Parent Display Name',isSelected:false},
    {columnName:'top_parent_manf_id',columnLabel:'Top Parent Manf ID',isSelected:false},
    {columnName:'top_parent_manf_name',columnLabel:'Top Parent Manf Name',isSelected:false},
    {columnName:'top_parent_display_name',columnLabel:'Top Parent Display Name',isSelected:false},
    {columnName:'comments',columnLabel:'Comments',isSelected:false},
    {columnName:'blacklist_flag',columnLabel:'Blacklist Flag',isSelected:false,inputType:InputType.Select,dropdownValues:DefaultYesNoValues},
    {columnName:'map_created_by',columnLabel:`${mapText} Created By`.trim(),isSelected:false},
    {columnName:'map_updated_by',columnLabel:`${mapText} Updated By`.trim(),isSelected:false},
    {columnName:'map_created_date',columnLabel:`${mapText} Created Date`.trim(),isSelected:false,inputType:InputType.RangeDatepicker,isContainSearch:true},
    {columnName:'map_updated_date',columnLabel:`${mapText} Updated Date`.trim(),isSelected:false,inputType:InputType.RangeDatepicker,isContainSearch:true},  
    ...getCreatedUpdateColumn(forAllRecords)
]

export const MasteredSearchOptionsMapped = (allowNull = false, mapText = '', forAllRecords = false): searchCriteriaInternal[] => [
    {columnName:'manf_map_id',columnLabel:'Manufacturer Map ID',isSelected:false,isAllowNull:allowNull},
    {columnName:'manufacturer_pguid',columnLabel:'Manufacturer PGUID',isSelected:false},
    {columnName:'distributor_pguid',columnLabel:'Distributor PGUID',isSelected:false},
    {columnName:'distributor_name',columnLabel:'Distributor Name',isSelected:false},
    {columnName:'ext_manf_key',columnLabel:'External Manf Key',isSelected:false},
    {columnName:'ext_manf_desc',columnLabel:'External Manf Desc',isSelected:false},
    {columnLabel:'Revenue',columnName:'revenue',inputType:InputType.RangeInput,isContainSearch:true,isAllowNull:true,isAllowFloat:true},
    {columnName:'manf_id',columnLabel:'Child Manf ID',isSelected:false},
    {columnName:'manf_name',columnLabel:'Child Manf Name',isSelected:false},
    {columnName:'child_display_name',columnLabel:'Child Display Name',isSelected:false},
    {columnName:'pmanf_id',columnLabel:'Parent Manf ID',isSelected:false},
    {columnName:'pmanf_name',columnLabel:'Parent Manf Name',isSelected:false},
    {columnName:'parent_display_name',columnLabel:'Parent Display Name',isSelected:false},
    {columnName:'top_parent_manf_id',columnLabel:'Top Parent Manf ID',isSelected:false},
    {columnName:'top_parent_manf_name',columnLabel:'Top Parent Manf Name',isSelected:false},
    {columnName:'top_parent_display_name',columnLabel:'Top Parent Display Name',isSelected:false},
    {columnName:'comments',columnLabel:'Comments',isSelected:false},
    {columnName:'blacklist_flag',columnLabel:'Blacklist Flag',isSelected:false,inputType:InputType.Select,dropdownValues:DefaultYesNoValues},
    {columnName:'map_created_by',columnLabel:`Created By`.trim(),isSelected:false},
    {columnName:'map_updated_by',columnLabel:`Updated By`.trim(),isSelected:false},
    {columnName:'map_created_date',columnLabel:`Created Date`.trim(),isSelected:false,inputType:InputType.RangeDatepicker,isContainSearch:true},
    {columnName:'map_updated_date',columnLabel:`Updated Date`.trim(),isSelected:false,inputType:InputType.RangeDatepicker,isContainSearch:true},  
]

const getCreatedUpdateColumn = (isForAll:boolean) => {
    if(isForAll) {
        return CommonDateRangeSearch('Ext Manf ')
    } else {
        return []
    }
}
    
