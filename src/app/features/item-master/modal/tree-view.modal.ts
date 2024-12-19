export class DynamicTreeViewNode {
  constructor(
    public title: string,
    public details: { code?: string; parentNode?: DynamicTreeViewNode; childCount?: number; childs?: any; dataMode?: string } = {},
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) {}
}

export const levelToType: any = {
  0: 'segment',
  1: 'family',
  2: 'class',
  3: 'commodity'
};

export const levelToTypeProps: any = {
  0: 'segments',
  1: 'families',
  2: 'classes',
  3: 'commodities'
};

export interface TreeSearchModal {
  isLevelMode: boolean;
  globalSeach: string;
  segment: string;
  family: string;
  class: string;
  commodity: string;
}
