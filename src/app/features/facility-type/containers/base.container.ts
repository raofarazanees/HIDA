export class BaseContainer {
  cacheBlockSize: number = 100;
  gridRowHeight: number = 30;
  isExceptionLead: boolean = false;

  constructor() {}

  checkExceptionLeadPermission(itemMasterRoles: string[]) {
    this.isExceptionLead = !!itemMasterRoles.filter((role: any) => role === 'Mastering_ExceptionLead' || role === 'Mastering_WFadmin')
      .length;
  }
}
