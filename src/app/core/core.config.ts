import { Injectable } from '@angular/core';

export const APP_NAME = 'hida';
export const REFERRER = `/${APP_NAME}/home`;

@Injectable()
export class CoreConfig {
  public readonly appName: string = APP_NAME;
  public readonly referrer: string = REFERRER;
}
