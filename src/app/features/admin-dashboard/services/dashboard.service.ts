import { MessageService } from 'src/app/shared/services';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkbenchSwaggerService } from 'src/app/swagger';
import * as jsonata from 'jsonata/jsonata-es5.js';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private wbSwagger: WorkbenchSwaggerService, private messageService: MessageService) {}

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

  uploadUnspscReclassificationFile(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadUnspscReclassificationFile(payload));
  }

  uploadAttributeMasterFile(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadAttributeMasterFile(payload));
  }

  uploadUnspscClientCorrectionFile(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadUnspscClientCorrectionFile(payload));
  }

  uploadLatestMappedDescriptions(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadLatestMappedDescriptions(payload));
  }

  getdownloadCurrentMappedDescriptionsURL(type: string): string {
    return this.wbSwagger.getdownloadCurrentMappedDescriptionsURL(type);
  }

  getdownloadManfParentChildURL(): string {
    return this.wbSwagger.getdownloadManfParentChildURL();
  }

  uploadManufacturerParentChildRelationships(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadManufacturerParentChildRelationships(payload));
  }

  uploadI2PItemsPairsForResolution(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadI2PItemsPairsForResolution(payload));
  }

  getUploadedFileHistory(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getUploadedFileHistory(payload));
  }

  getUploadedFileDetails(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getUploadedFileDetails(payload));
  }

  uploadProductAttributeFile(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadProductAttributeFile(payload));
  }

  getActiveAttributesMaster(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getActiveAttributesMaster());
  }

  downloadProductAttributeTaggingFile(payload: any): Observable<any> {
    return this.wbSwagger.downloadProductAttributeTaggingFile(payload);
  }

  UploadProductMergeUnmergedGraphFile(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.UploadProductMergeUnmergedGraphFile(payload));
  }

  DownloadProductMergeUnmergedGraphFile(payload: any): Observable<any> {
    return this.wbSwagger.downloadProductGraphFile(payload);
  }

  retrieveGraphProductItemView(payload: any): Observable<any> {
    return this.wbSwagger.retrieveGraphProductItemView(payload);
  }

  async downloadFileCommonFunction(data: any): Promise<boolean> {
    const contentDisposition = data.headers.get('content-disposition');
    const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().replaceAll('"', '');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(data.body);
    a.download = filename;
    a.click();
    return true;
  }

  parseBlobAndDisplayMessage(data): void {
    const url = URL.createObjectURL(data.error);
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.open('GET', url, false);
    xmlRequest.send();
    URL.revokeObjectURL(url);
    this.messageService.showToast(
      jsonata('message').evaluate(JSON.parse(xmlRequest.responseText)) || 'Unable to download Product extension file',
      'warn'
    );
  }

  I2PTriggerIncrementalProcess(payload: any): Observable<any> {
    return this.wbSwagger.I2PTriggerIncrementalProcess(payload);
  }

  I2PTriggerOutboundRefreshProcess(payload: any): Observable<any> {
    return this.wbSwagger.I2PTriggerOutboundRefreshProcess(payload);
  }

  UploadBrandMasterCVFile(payload: any): Observable<any> {
    return this.wbSwagger.UploadBrandMasterCVFile(payload);
  }

  UploadBrandProductMappingFile(payload: any): Observable<any> {
    return this.wbSwagger.UploadBrandProductMappingFile(payload);
  }

  GetActiveProductBrands(): Observable<any> {
    return this.wbSwagger.GetActiveProductBrands();
  }

  retrieveProductBrandItem(payload: any): Observable<any> {
    return this.wbSwagger.retrieveProductBrandItem(payload);
  }

  DownloadProductBrandTaggingFile(payload: any): Observable<any> {
    return this.wbSwagger.DownloadProductBrandTaggingFile(payload);
  }

  retrieveProductStagingCurationUNSPSCs(payload: any): Observable<any> {
    return this.wbSwagger.retrieveProductStagingCurationUNSPSCs(payload);
  }

  UploadProductLevelClusteringFile(payload: any): Observable<any> {
    return this.wbSwagger.UploadProductLevelClusteringFile(payload);
  }

  CreateTaskForProductStagingUnspsc(payload: any): Observable<any> {
    return this.wbSwagger.CreateTaskForProductStagingUnspsc(payload);
  }

  DownloadFileForProductStagingUnspsc(payload: any): Observable<any> {
    return this.wbSwagger.DownloadFileForProductStagingUnspsc(payload);
  }

  UploadFileForProductStaging(payload: any): Observable<any> {
    return this.wbSwagger.UploadFileForProductStaging(payload);
  }

  UploadFileForProductStagingForLabelling(payload: any): Observable<any> {
    return this.wbSwagger.UploadFileForProductStagingForLabelling(payload);
  }
  
  StagingTriggerOutboundRefreshProcess(payload: any): Observable<any> {
    return this.wbSwagger.stagingTriggerOutboundRefreshProcess(payload);
  }

  UploadUoMRegularFile(payload: any): Observable<any> {
    return this.wbSwagger.UploadUoMRegularFile(payload);
  }

  
  UploadUoMAdhocFile(payload: any): Observable<any> {
    return this.wbSwagger.UploadUoMAdhocFile(payload);
  }
  UploadSkuDataForClusturingFile(payload: any): Observable<any> {
    return this.wbSwagger.UploadSkuDataForClusturingFile(payload);
  }

  DownloadUOMDataFile(payload: any): Observable<any> {
    return this.wbSwagger.DownloadUOMDataFile(payload);
  }

  UploadUoMCorrectionFile(payload: any): Observable<any> {
    return this.wbSwagger.UploadUoMCorrectionFile(payload);
  }

  makeGenericHttpReq({method,data,url}):Observable<any> {
   return this.wbSwagger.makeHttpRequest(method,url,data);
  }

  uploadBrandFeatureSuggestion(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadBrandFeatureSuggestion(payload));
  }
}
