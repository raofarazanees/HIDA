import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { DefaultYesNoValues } from './unspsc-master-filter-options';
import { CommonCreateUpdateOptions } from './common.search-options';

export const FacilityMasterFilterOptions = (): searchCriteriaInternal[] => [
    { columnLabel: 'Facility ID', columnName: 'facility_id', isSelected: false },
    { columnLabel: 'Facility Subgroup Name', columnName: 'facility_subgroup_name', isSelected: false },
    { columnLabel: 'Facility Group Name', columnName: 'facility_group_name', isSelected: false },
    { columnLabel: 'Is Facility Active ?', columnName: 'active', isSelected: false,inputType:'dropdown',dropdownValues:DefaultYesNoValues},
    ...CommonCreateUpdateOptions()
]