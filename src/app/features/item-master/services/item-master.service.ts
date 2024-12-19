import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { TaskType } from '../modal/ag-grid.constants';
import { WorkbenchSwaggerService } from './../../../swagger';
@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {
  constructor(private wbSwagger: WorkbenchSwaggerService) {}

  genericResponseCatcher(request: any): Observable<any> {
    return request.pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: any) => {
        return throwError(error?.error || false);
      })
    );
  }

  getUnmasteredRecords({ groupName }: any): any {
    if (groupName.substr(0, 3) === 'RC_') {
      return this.wbSwagger.getAllItemsForUNSPSCReclassification(groupName);
    } else if (groupName.substr(0, 3) === 'CC_') {
      return this.wbSwagger.getAllItemsForUNSPSCClientCorrection(groupName);
    }
    return this.wbSwagger.getUnspscUnmasteredRecords(groupName);
  }

  getUNSPSCAttributeExtensions(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getUNSPSCAttributeExtensions());
  }

  submitTask(payload: any, taskType: string): Observable<any> {
    if (taskType === TaskType.RC) {
      return this.genericResponseCatcher(this.wbSwagger.submitUNSPSCReclassifiedObject(payload));
    } else if (taskType === TaskType.CC) {
      return this.genericResponseCatcher(this.wbSwagger.submitClientCorrectedItems(payload));
    }
    return this.genericResponseCatcher(this.wbSwagger.submitItemMasterTask(payload));
  }

  saveForLater(payload: any, taskType: string): Observable<any> {
    if (taskType === TaskType.RC) {
      return this.genericResponseCatcher(this.wbSwagger.reclassificationSaveForLater(payload));
    } else if (taskType === TaskType.CC) {
      return this.genericResponseCatcher(this.wbSwagger.clientCorrectedSaveForLater(payload));
    }
    return this.genericResponseCatcher(this.wbSwagger.itemMastersaveForLater(payload));
  }

  getAllItemMasteredRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getAllUnspscMasterRecords(payload));
  }

  getAllUnspscRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getAllUnspscLibrary(payload));
  }

  updateMasteredRecord(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateUnspscMasteredRecord(payload));
  }

  getMasteredMapIDChangeLog(payload: any): any {
    return this.genericResponseCatcher(this.wbSwagger.getChangeLogForUnspsc(payload));
  }

  getUNSPSCForTreeView(payload: any): any {
    return this.genericResponseCatcher(this.wbSwagger.getUNSPSCForTreeView(payload));
  }

  getUNSPSCSearchForTreeView(payload: any): any {
    return this.genericResponseCatcher(this.wbSwagger.getUNSPSCSearchForTreeView(payload));
  }

  getItemPguidByUnspsc(payload: any): any {
    return this.genericResponseCatcher(this.wbSwagger.getItemPguidByUnspsc(payload));
  }

  getUNSPSCClientCorrectionRejectedInfo(payload: any): any {
    return this.genericResponseCatcher(this.wbSwagger.getUNSPSCClientCorrectionRejectedInfo(payload));
  }
}
