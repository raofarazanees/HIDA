import { TaskType } from '../modal/ag-grid.constants';

export class BaseContainer {
  cacheBlockSize: number = 100;
  gridRowHeight: number = 30;
  isExceptionLead: boolean = false;
  taskType: string;

  constructor() {}

  checkExceptionLeadPermission(itemMasterRoles: string[]) {
    this.isExceptionLead = !!itemMasterRoles.filter((role: any) => role === 'Mastering_ExceptionLead' || role === 'Mastering_WFadmin')
      .length;
  }

  updateTaskType(groupName: string): string {
    switch (groupName.substr(0, 3)) {
      case 'RC_':
        return TaskType.RC;
      case 'UM_':
        return TaskType.UM;
      case 'CC_':
        return TaskType.CC;
      default:
        return TaskType.P;
    }
  }
}
