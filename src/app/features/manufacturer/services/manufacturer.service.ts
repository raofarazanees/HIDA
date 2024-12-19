import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkbenchSwaggerService } from './../../../swagger';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
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

  updateManufacturer(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.submitManufacturerRecords(payload));
  }

  saveForLater(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.manufacturerSaveForLater(payload));
  }

  getUnmasteredRecords(payload: any): Observable<any> {
    return this.wbSwagger.getManufacturerUnmasteredRecords(payload).pipe(
      map((data: any) => {
        return {
          totalRecords: data.totalRecords,
          list: data.list.map((item: any) => {
            return {
              ...item,
              mapping: {
                id: item.manufacturerInternalId,
                value: item.internalManufacturerDesc
              }
            };
          })
        };
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getTotalMappedRecordsCount(distributorPguid): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getMappedRecordsCount(distributorPguid, 'manufacturer'));
  }

  getMasteredManufacturerList(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getManufacturerMasterRecords(payload));
  }

  getAllMasterValues(groupName: string): any {
    return this.wbSwagger.getInternalFieldsForMapping(groupName);
  }

  getMasteredMapIDChangeLog(payload: any): any {
    return this.genericResponseCatcher(this.wbSwagger.getChangeLogForManufacturer(payload));
  }

  updateMasteredRecord(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateManufacturerMasteredRecord(payload));
  }
}
