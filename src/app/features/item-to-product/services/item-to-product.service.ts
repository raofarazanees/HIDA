import { StagingCurationTaskSubmission } from './../store/actions/staging-curation.actions';
import { GetProductBrandForConfirmation } from './../store/actions/graph.actions';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkbenchSwaggerService } from 'src/app/swagger/workbench-swagger.service';
import { environment } from '@app-environment';

declare let oboe: any;

@Injectable({
  providedIn: 'root'
})
export class ItemToProductService {
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

  getItemsForGrouping(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getItemsForGrouping(payload));
  }

  getPairsForResolution(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getPairsForResolution(payload));
  }

  getItemPairsForConfirmation(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getItemPairsForConfirmation(payload));
  }

  confirmItemPairs(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.confirmItemPairs(payload));
  }

  getGraphItemForMergeUnMerge(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getGraphItemForMergeUnMerge(payload));
  }

  confirmGraphProduct(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.confirmGraphProduct(payload));
  }

  getGraphItemsForProduct(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getGraphItemsForProduct(payload));
  }

  getProductBrandForConfirmation(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getProductBrandForConfirmation(payload));
  }

  productBrandTaskSubmission(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.productBrandTaskSubmission(payload));
  }

  retrieveProductUNSPSCsForCuration(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveProductUNSPSCsForCuration(payload));
  }

  retrieveProductItemForView(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveProductItemForView(payload));
  }

  downloadStagingCurationWorkbenchFile(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.downloadStagingCurationWorkbenchFile(payload));
  }

  uploadStagingCurationWorkbenchFile(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.UploadFileForProductStagingForCuration(payload));
  }

  stagingCurationSaveForLater(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.stagingCurationSaveForLater(payload));
  }

  redirectToTaskInbox() {
    const redirectionPath = `${environment.taskInboxApp}/embedui/taskmgmt/index.html#/taskinbox${
      sessionStorage.getItem('currentPath') ? sessionStorage.getItem('currentPath') : '/TaskList/New'
    }`;
    window.open(redirectionPath, '_self');
  }

  stagingCurationTaskSubmission(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.stagingCurationTaskSubmission(payload));
  }

  retrieveProductUNSPSCsForFinalReview(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveProductUNSPSCsForFinalReview(payload));
  }

  submitFinalConfirmationRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.submitFinalConfirmationRecords(payload));
  }

}
