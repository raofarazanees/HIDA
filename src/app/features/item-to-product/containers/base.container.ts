export class BaseContainer {
  cacheBlockSize: number = 100;
  gridRowHeight: number = 30;
  userProfile: any = { isExceptionLead: false, userName: '', email: '' };

  constructor() {}
}

export interface userProfileModel {
  isExceptionLead: boolean;
  userName: string;
  email: string;
}
