import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { DefaultYesNoValues } from './unspsc-master-filter-options';
import { CommonCreateUpdateOptions } from './common.search-options';

export const MarketMasterFilterOptions = (): searchCriteriaInternal[] => [
    { columnLabel: 'Market ID', columnName: 'market_id', isSelected: false },
    { columnLabel: 'Market Name', columnName: 'market_name', isSelected: false },
    { columnLabel: 'Submarket Name', columnName: 'submarket_name', isSelected: false },
    { columnLabel: 'Is Market Active ?', columnName: 'active', isSelected: false,inputType:'dropdown',dropdownValues:DefaultYesNoValues},
    ...CommonCreateUpdateOptions()
]