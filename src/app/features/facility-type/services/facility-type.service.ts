import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkbenchSwaggerService } from './../../../swagger';
@Injectable({
  providedIn: 'root'
})
export class FacilityTypeService {
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

  submitTask(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.submitFacilityTask(payload));
  }

  saveForLater(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.facilitySaveForLater(payload));
  }

  getAllMappingValues(groupName: string): any {
    return this.wbSwagger.getInternalFieldsForMapping(groupName);
  }

  getMasteredMapIDChangeLog(payload: any): any {
    return this.genericResponseCatcher(this.wbSwagger.getChangeLogForFacility(payload));
  }

  getUnmasteredRecords(payload: any): Observable<any> {
    return this.wbSwagger.getFacilityUnmasteredRecords(payload).pipe(
      map((data: any) => {
        return {
          totalRecords: data.totalRecords,
          list: data.list.map((item: any) => {
            return {
              ...item,
              mapping: {
                id: item.facilityInternalId,
                value: this.getMappingValue(item)
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

  getMasteredRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getFacilityMasteredRecords(payload));
  }

  getTotalMappedRecordsCount(distributorPguid: number): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getMappedRecordsCount(distributorPguid, 'facility'));
  }

  getMappingValue(item: any): string {
    let value = '';
    if (item.internalFacilityGroupDesc && item.internalFacilitySubgroupDesc) {
      value = item.internalFacilityGroupDesc + ' | ' + item.internalFacilitySubgroupDesc;
    } else if (item.internalFacilityGroupDesc) {
      value = item.internalFacilityGroupDesc;
    }
    return value;
  }

  updateMasteredRecord(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateFacilityMasteredRecord(payload));
  }
}
