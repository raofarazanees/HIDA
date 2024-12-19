import { InputType, searchCriteriaInternal } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { CommonCreateUpdateOptions } from './common.search-options';
import { DefaultYesNoValues } from './unspsc-master-filter-options';

export const FacilityForMapFilterOptions = (): searchCriteriaInternal[] => [
    { columnLabel: 'FacilityType PGUID', columnName: 'facility_type_pguid', isSelected: false },
    { columnLabel: 'Distributor PGUID', columnName: 'distributor_pguid', isSelected: false },
    { columnLabel: 'Distributor Name', columnName: 'distributor_name', isSelected: false },
    { columnLabel: 'Ext Facility Key', columnName: 'ext_facility_type_key', isSelected: false },
    { columnLabel: 'Ext Facility Desc', columnName: 'ext_facility_type_desc', isSelected: false },
    { columnLabel: 'Created Date', columnName: 'created_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch:true },
    { columnLabel: 'Updated Date', columnName: 'updated_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch:true },

]

export const FacilityMappedFilterOptions = (): searchCriteriaInternal[] => [
    { columnLabel: 'Facility Map ID', columnName: 'facility_map_id', isSelected: false },
    { columnLabel: 'Facility PGUID', columnName: 'facility_type_pguid', isSelected: false },
    { columnLabel: 'Distributor PGUID', columnName: 'distributor_pguid', isSelected: false },
    { columnLabel: 'Distributor Name', columnName: 'distributor_name', isSelected: false },
    { columnLabel: 'Ext Facility Key', columnName: 'ext_facility_key', isSelected: false },
    { columnLabel: 'Ext Facility Desc', columnName: 'ext_facility_desc', isSelected: false },
    { columnLabel: 'Facility ID', columnName: 'facility_id', isSelected: false },
    { columnLabel: 'Facility Subgroup Name', columnName: 'facility_subgroup_name', isSelected: false },
    { columnLabel: 'Facility Group Name', columnName: 'facility_group_name', isSelected: false },
    { columnLabel: 'Comments', columnName: 'comments', isSelected: false },
    { columnLabel: 'Created By', columnName: 'map_created_by', isSelected: false },
    { columnLabel: 'Created Date', columnName: 'map_created_date', isSelected: false,inputType: InputType.RangeDatepicker, isContainSearch: true },
    { columnLabel: 'Updated By', columnName: 'map_updated_by', isSelected: false },
    { columnLabel: 'Updated Date', columnName: 'map_updated_date', isSelected: false,inputType: InputType.RangeDatepicker, isContainSearch: true },
]


export const FacilityMappedFilterOptionsAllTab = (): searchCriteriaInternal[] => [
    { columnLabel: 'Facility Map ID', columnName: 'facility_map_id', isSelected: false,isAllowNull:true },
    { columnLabel: 'Facility PGUID', columnName: 'facility_type_pguid', isSelected: false },
    { columnLabel: 'Distributor PGUID', columnName: 'distributor_pguid', isSelected: false },
    { columnLabel: 'Distributor Name', columnName: 'distributor_name', isSelected: false },
    { columnLabel: 'Ext Facility Key', columnName: 'ext_facility_type_key', isSelected: false },
    { columnLabel: 'Ext Facility Desc', columnName: 'ext_facility_type_desc', isSelected: false },
    { columnLabel: 'Facility ID', columnName: 'facility_id', isSelected: false,isAllowNull:true },
    { columnLabel: 'Facility Subgroup Name', columnName: 'facility_subgroup_name', isSelected: false,isAllowNull:true },
    { columnLabel: 'Facility Group Name', columnName: 'facility_group_name', isSelected: false,isAllowNull:true },
    { columnLabel: 'Is Mastered ?',columnName:'is_mastered',inputType:InputType.Select,dropdownValues:DefaultYesNoValues},
    { columnLabel: 'Comments', columnName: 'comments', isSelected: false,isAllowNull:true },
    { columnLabel: 'Map Created By', columnName: 'map_created_by', isSelected: false,isAllowNull:true },
    { columnLabel: 'Map Created Date', columnName: 'map_created_date', isSelected: false,inputType: InputType.RangeDatepicker, isContainSearch: true },
    { columnLabel: 'Map Updated By', columnName: 'map_updated_by', isSelected: false,isAllowNull:true },
    { columnLabel: 'Map Updated Date', columnName: 'map_updated_date', isSelected: false,inputType: InputType.RangeDatepicker, isContainSearch: true },
    { columnLabel: 'Ext Facility Created Date', columnName: 'created_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch:true },
    { columnLabel: 'Ext Facility Updated Date', columnName: 'updated_date', isSelected: false, inputType: InputType.RangeDatepicker, isContainSearch:true },
]