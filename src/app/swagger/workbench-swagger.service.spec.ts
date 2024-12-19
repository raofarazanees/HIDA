import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { environment } from '@app-environment';
import { of } from 'rxjs';
import { WorkbenchSwaggerService } from 'src/app/swagger';

describe('WorkbenchSwaggerService', () => {
  let service: WorkbenchSwaggerService;
  const mockResponse = {
    status: 200,
    body: {
      data: 'test result',
      message: 'Success'
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WorkbenchSwaggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'submitFacilityTask' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.submitFacilityTask([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'submitFacilityTask' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.submitFacilityTask([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'submitFacilityTask' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.submitFacilityTask([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'facilitySaveForLater' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.facilitySaveForLater([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'submitItemMasterTask' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.submitItemMasterTask([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'itemMastersaveForLater' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.itemMastersaveForLater([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'submitManufacturerRecords' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.submitManufacturerRecords([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'manufacturerSaveForLater' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.manufacturerSaveForLater([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'updateManufacturerMasteredRecord' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.updateManufacturerMasteredRecord([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'updateFacilityMasteredRecord' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.updateFacilityMasteredRecord([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'updateUnspscMasteredRecord' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.updateUnspscMasteredRecord([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'submitSalesRestateData' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.submitSalesRestateData([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'getInternalFieldsForMapping' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'get').and.returnValues(of(response));
    service.getInternalFieldsForMapping('test');
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getFacilityUnmasteredRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getFacilityUnmasteredRecords({
      distributorPguid: 1,
      limit: 10,
      offset: 0,
      searchCriteria: [],
      sortCriteria: []
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getFacilityMasteredRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getFacilityMasteredRecords({
      limit: 10,
      offset: 0,
      searchCriteria: [],
      sortCriteria: []
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getMappedRecordsCount' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'get').and.returnValues(of(response));
    service.getMappedRecordsCount(1, 'Manufacturer');
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getUnspscUnmasteredRecords' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'get').and.returnValues(of(response));
    service.getUnspscUnmasteredRecords('group_1');
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getAllUnspscMasterRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getAllUnspscMasterRecords({
      limit: 10,
      offset: 0,
      searchCriteria: [],
      sortCriteria: []
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getAllUnspscLibrary' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getAllUnspscLibrary({
      limit: 10,
      offset: 0,
      searchCriteria: [],
      sortCriteria: []
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getManufacturerUnmasteredRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getManufacturerUnmasteredRecords({
      distributorPguid: 1,
      limit: 10,
      offset: 0,
      searchCriteria: [],
      sortCriteria: []
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getManufacturerMasterRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getManufacturerMasterRecords({
      limit: 10,
      offset: 0,
      searchCriteria: [],
      sortCriteria: []
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getAllRestateRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getAllRestateRecords({
      limit: 10,
      offset: 0,
      searchCriteria: [],
      sortCriteria: []
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getChangeLogForFacility' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'get').and.returnValues(of(response));
    service.getChangeLogForFacility(1);
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getChangeLogForManufacturer' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'get').and.returnValues(of(response));
    service.getChangeLogForManufacturer(1);
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getChangeLogForUnspsc' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'get').and.returnValues(of(response));
    service.getChangeLogForUnspsc(1);
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getUNSPSCForTreeView' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: [],
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getUNSPSCForTreeView({ limit: 500, offset: 0, parentCode: 1000000, targetLevel: 1 });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getUNSPSCSearchForTreeView' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: [],
        message: 'Success'
      }
    };
    spyOn(http, 'post').and.returnValues(of(response));
    service.getUNSPSCSearchForTreeView({
      limit: 500,
      offset: 0,
      searchCondition: 'OR',
      searchCriteria: [{ level: '*', searchText: 'xyz' }]
    });
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getAllItemsForUNSPSCReclassification' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getAllItemsForUNSPSCReclassification('RC_test');
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getAllItemsForUNSPSCClientCorrection' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getAllItemsForUNSPSCClientCorrection('CC_test');
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getAllItemsForUNSPSCClientCorrection' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getAllItemsForUNSPSCClientCorrection('CC_test');
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'submitUNSPSCReclassifiedObject' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.submitUNSPSCReclassifiedObject([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'submitClientCorrectedItems' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.submitClientCorrectedItems([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'reclassificationSaveForLater' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.reclassificationSaveForLater([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'clientCorrectedSaveForLater' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.clientCorrectedSaveForLater([{ id: 1 }]);
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'getItemPguidByUnspsc' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getItemPguidByUnspsc({ code: '10000000', level: 'segment', view: 'basic' });
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getUNSPSCClientCorrectionRejectedInfo' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getUNSPSCClientCorrectionRejectedInfo({ itemPGUID: '1' });
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'uploadUnspscReclassificationFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.uploadUnspscReclassificationFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'uploadUnspscClientCorrectionFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.uploadUnspscClientCorrectionFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'uploadLatestMappedDescriptions' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.uploadLatestMappedDescriptions({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'uploadProductAttributeFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.uploadProductAttributeFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getActiveAttributesMaster' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getActiveAttributesMaster();
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'downloadProductAttributeTaggingFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.downloadProductAttributeTaggingFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'UploadProductMergeUnmergedGraphFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.UploadProductMergeUnmergedGraphFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'retrieveGraphProductItemView' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.retrieveGraphProductItemView({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'downloadProductGraphFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.downloadProductGraphFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getGraphItemForMergeUnMerge' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getGraphItemForMergeUnMerge({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'confirmGraphProduct' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.confirmGraphProduct({});
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'getGraphItemsForProduct' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.getGraphItemsForProduct({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'I2PTriggerIncrementalProcess' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.I2PTriggerIncrementalProcess({});
    expect(http.post).toHaveBeenCalled();
  }));

  xit(`'I2PTriggerOutboundRefreshProcess' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.I2PTriggerOutboundRefreshProcess({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'UploadBrandMasterCVFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.UploadBrandMasterCVFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'UploadBrandProductMappingFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.UploadBrandProductMappingFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'GetActiveProductBrands' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.GetActiveProductBrands();
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'retrieveProductBrandItem' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.retrieveProductBrandItem({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'DownloadProductBrandTaggingFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.DownloadProductBrandTaggingFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'getProductBrandForConfirmation' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getProductBrandForConfirmation({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'productBrandTaskSubmission' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.productBrandTaskSubmission({});
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'retrieveProductStagingCurationUNSPSCs' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.retrieveProductStagingCurationUNSPSCs({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'UploadProductLevelClusteringFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.UploadProductLevelClusteringFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'CreateTaskForProductStagingUnspsc' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.CreateTaskForProductStagingUnspsc({});
    expect(http.post).toHaveBeenCalled();
  }));
  

  it(`'getUNSPSCAttributeExtensions' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getUNSPSCAttributeExtensions();
    expect(http.get).toHaveBeenCalled();
  }));

  
  it(`'uploadAttributeMasterFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.uploadAttributeMasterFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'uploadManufacturerParentChildRelationships' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.uploadManufacturerParentChildRelationships({});
    expect(http.post).toHaveBeenCalled();
  }));


  it(`'uploadI2PItemsPairsForResolution' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.uploadI2PItemsPairsForResolution({});
    expect(http.post).toHaveBeenCalled();
  }));


  it(`'getItemsForGrouping' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getItemsForGrouping({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getPairsForResolution' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getPairsForResolution({});
    expect(http.get).toHaveBeenCalled();
  }));


  it(`'getItemPairsForConfirmation' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getItemPairsForConfirmation({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getGroupsRelatedToItems' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getGroupsRelatedToItems({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'confirmItemPairs' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.confirmItemPairs({});
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'submitItemToProductRecords' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.submitItemToProductRecords({});
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'getChangeLogI2PItem' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getChangeLogI2PItem({});
    expect(http.get).toHaveBeenCalled();
  }));


  it(`'getUploadedFileHistory' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getUploadedFileHistory({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getUploadedFileDetails' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.getUploadedFileDetails({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'getAllGroupedRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.getAllGroupedRecords({});
    expect(http.post).toHaveBeenCalled();
  }));

  it('Should called getDownloadItemPairForResolutionURL Function', () => {
    expect(service.getDownloadItemPairForResolutionURL()).toBe(`${environment.hidaBaseUrl}/itemtoproduct/downloadI2PItemPairsForResolutionFile?initiatedByUserEmail=&initiatedByUserName=`);
  });

  it('Should called getdownloadCurrentMappedDescriptionsURL Function', () => {
    expect(service.getdownloadCurrentMappedDescriptionsURL('test')).toBe(`${environment.hidaBaseUrl}/common/downloadCurrentMappedDescriptions/test`);
  });

  it('Should called getdownloadManfParentChildURL Function', () => {
    expect(service.getdownloadManfParentChildURL()).toBe(`${environment.hidaBaseUrl}/common/downloadCurrentManufacturerParentChildRelationships`);
  });

  it('Should called getDownloadUNSPSCAttributeExtensionURL Function', () => {
    expect(service.getDownloadUNSPSCAttributeExtensionURL()).toBe(`${environment.hidaBaseUrl}/common/downloadCurrentUNSPSCExtensionAttributes`);
  });
  
  it('Should called getDownloadAttributeMasterURL Function', () => {
    expect(service.getDownloadAttributeMasterURL()).toBe(`${environment.hidaBaseUrl}/common/downloadCurrentAttributesOfMaster`);
  });

  it('Should called getGroupsForReassignment Function', () => {
    expect(service.getGroupsForReassignment()).toBe(`${environment.hidaBaseUrl}/itemtoproduct/getI2PGroupsForItemReassignment`);
  });

  it('Should called getBrandMasterRecordsURL Function', () => {
    expect(service.getBrandMasterRecordsURL()).toBe(`${environment.hidaBaseUrl}/common/downloadBrandMasterRecords`);
  });


  it(`'DownloadFileForProductStagingUnspsc' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.DownloadFileForProductStagingUnspsc({});
    expect(http.post).toHaveBeenCalled();
  }));
  
  it(`'UploadFileForProductStaging' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.UploadFileForProductStaging({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'UploadFileForProductStagingForLabelling' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.UploadFileForProductStagingForLabelling({});
    expect(http.post).toHaveBeenCalled();
  }));
  

  it(`'retrieveProductUNSPSCsForCuration' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.retrieveProductUNSPSCsForCuration({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'retrieveProductItemForView' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.retrieveProductItemForView({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'stagingCurationTaskSubmission' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.stagingCurationTaskSubmission({});
    expect(http.put).toHaveBeenCalled();
  }));

  it(`'stagingCurationSaveForLater' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.stagingCurationSaveForLater({});
    expect(http.put).toHaveBeenCalled();
  }));
  
  it(`'UploadFileForProductStagingForCuration' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.UploadFileForProductStagingForCuration({});
    expect(http.post).toHaveBeenCalled();
  }));

  
  it(`'downloadStagingCurationWorkbenchFile' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.downloadStagingCurationWorkbenchFile({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'stagingTriggerOutboundRefreshProcess' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'post').and.returnValues(of(mockResponse));
    service.stagingTriggerOutboundRefreshProcess({});
    expect(http.post).toHaveBeenCalled();
  }));

  it(`'retrieveProductUNSPSCsForFinalReview' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'get').and.returnValues(of(mockResponse));
    service.retrieveProductUNSPSCsForFinalReview({});
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'submitFinalConfirmationRecords' should have called 'http.post'`, inject([HttpClient], (http: HttpClient) => {
    spyOn(http, 'put').and.returnValues(of(mockResponse));
    service.submitFinalConfirmationRecords({});
    expect(http.put).toHaveBeenCalled();
  }));

});

