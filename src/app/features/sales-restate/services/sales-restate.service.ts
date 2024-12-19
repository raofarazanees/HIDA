import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkbenchSwaggerService } from './../../../swagger';

@Injectable({
  providedIn: 'root'
})
export class SalesRestateService {
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

  getAllRestateRecords(payload: any): Observable<any> {
    return this.wbSwagger.getAllRestateRecords(payload).pipe(
      map((data: any) => {
        return {
          totalRecords: data.totalRecords,
          salesRestateList: data.salesRestateList.map((item: any) => {
            return {
              ...item,
              status: ''
            };
          })
        };
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  submitData(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.submitSalesRestateData(payload));
  }
}
