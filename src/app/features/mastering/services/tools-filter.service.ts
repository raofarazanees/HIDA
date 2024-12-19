import { createManufacturerMapping } from './../store/actions/manf-master.actions';
import { Injectable } from '@angular/core';
import { WorkbenchSwaggerService } from '@app-swagger';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductSearchCriteria } from '../../admin-dashboard/store/reducers/common.reducer';
import { UserInitiatedData } from '../../admin-dashboard/modal/user-initiated-interface';
import { SearchUnspsc } from '../model/manf-master-models/interface/product-entitlement.interface';

@Injectable({
  providedIn: 'root'
})
export class ToolsFilterService {

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

  retrieveParentManfSearchRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveParentManfSearchRecords(payload));
  }

  createNewParentManfRecord(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.createNewParentManfRecord(payload));
  }

  
  UpdateParentManfRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateParentManfRecords(payload));
  }

  GetActiveParentManfRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.GetActiveParentManfRecords(payload));
  }

  retrieveChildParentManfSearchRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveChildParentManfSearchRecords(payload));
  }

  createNewChildManfRecord(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.createNewChildManfRecord(payload));
  }

  getParentManfRecordChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getParentManfRecordChangeLog(payload));
  }

  getChildManfRecordChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getChildManfRecordChangeLog(payload));
  }

  UpdateChildParentManfRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.UpdateChildParentManfRecords(payload));
  }

  
  GetActiveChildParentManfRecords(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.GetActiveChildParentManfRecords());
  }

  GetManfRecordsForMapping(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.GetManfRecordsForMapping(payload));
  }
  
  CreateManufacturerMapping(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.CreateManufacturerMapping(payload));
  }

  getMasteredManfRecordChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getMasteredManfRecordChangeLog(payload));
  }

    
  getMappedMasteredRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getMappedMasteredRecords(payload));
  }

  UpdateMasteredManfRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.UpdateMasteredManfRecords(payload));
  }

  retrieveUnspscMasterSearchRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveUnspscMasterSearchRecords(payload));
  }

  updateUnspscRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateUnspscRecords(payload));
  } 

  retrieveZipMasterSearchRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveZipMasterSearchRecords(payload));
  }

  updateZipRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateZipRecords(payload));
  } 

  getZipRecordChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getZipRecordChangeLog(payload));
  } 

  getActiveMarketRecords(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getActiveMarketRecords());
  }

  getUnspscRecordChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getUnspscRecordChangeLog(payload));
  }

  createNewMarketMasterRecord(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.createNewMarketMasterRecord(payload));
  }

  retrieveMarketMasterSearchRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveMarketMasterSearchRecords(payload));
  }

  updateMarketMasterRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateMarketMasterRecords(payload));
  } 

  getMarketRecordChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getMarketRecordChangeLog(payload));
  }

  retrieveFacilityMasterSearchRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveFacilityMasterSearchRecords(payload));
  }

  createFacilityMasterRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.createFacilityMasterRecords(payload));
  }
  
  updateFacilityMasterRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateFacilityMasterRecords(payload));
  } 

  getActiveFacilityMasterRecords(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getActiveFacilityMasterRecords());
  }

  retrieveFacilityForMappingRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveFacilityForMappingRecords(payload));
  }

  getMasterFacilityChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getMasterFacilityChangeLog(payload));
  }

  getTopParentRecord(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getTopParentRecord());
  }

  createFacilityMapping(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.createFacilityMapping(payload));
  }

  retrieveFacilityMappedSearchRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveFacilityMappedSearchRecords(payload));
  }

  getMappedFacilityChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getMappedFacilityChangeLog(payload));
  }

  updateFacilityMappedRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateFacilityMappedRecords(payload));
  } 

  retrieveBrandMasterSearchRecords(payload: ProductSearchCriteria): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveBrandMasterSearchRecords(payload));
  }

  createBrandMasterRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.createBrandMasterRecords(payload));
  }

  updateBrandMasterRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateBrandMasterRecords(payload));
  } 

  getBrandCVChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getBrandCVChangeLog(payload));
  }

  retrieveProductEntitlementSearchRecords(payload: ProductSearchCriteria): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveProductEntitlementSearchRecords(payload));
  }

  retrieveItemToProductRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveItemToProductDetailsRecords(payload));
  }

  DownloadParentChildFile(payload: ProductSearchCriteria): Observable<any> {
    return this.wbSwagger.DownloadParentChildFile(payload);
  }
  retrieveBrandMappingSearchRecords(payload: ProductSearchCriteria): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveBrandMappingSearchRecords(payload));
  }

  retrieveActiveBrandRecords(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveActiveBrandRecords());
  }

  updateBrandMappingRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateBrandMappingRecords(payload));
  } 

  retrieveUnspscCodeRecords(payload:SearchUnspsc): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveUnspscCodeRecords(payload));
  }

  retrieveActiveBrandMapping(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveActiveBrandMapping());
  }

  updateProductInfoRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.updateProductInfoRecords(payload));
  } 

  getProductChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getProductChangeLog(payload));
  }

  getBrandMapChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getBrandMapChangeLog(payload));
  }

  GetAllManfRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.GetAllManfRecords(payload));
  }

  ManageManfRecords(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.ManageManfRecords(payload));
  }

  
  retrieveAllFacilities(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveAllFacilities(payload));
  }

  manageFacMappings(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.manageFacMappings(payload));
  }

  DownloadMastersFile(payload:ProductSearchCriteria,url:string,type:string ='master'): Observable<any> {
    return this.wbSwagger.DownloadMasterCSVFile(payload,url,type);
  }

  getActiveBusinessUsers(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getActiveBusinessUsers());
  } 

 uploadPIMCsv(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.uploadPIMCsv(payload));
  }

  retrieveBrandSourceRecords(): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.retrieveBrandSourceRecords());
  }

  getI2PGraphHistoryRecordChangeLog(payload: any): Observable<any> {
    return this.genericResponseCatcher(this.wbSwagger.getI2PGraphHistoryRecordChangeLog(payload));
  }
}
