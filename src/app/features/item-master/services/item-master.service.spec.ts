import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { WorkbenchSwaggerService } from 'src/app/swagger';
import { ItemMasterService } from './item-master.service';

describe('ItemMasterService', () => {
  let service: ItemMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ItemMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'submitTask' should have called 'wbSwagger.submitItemMasterTask'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'submitItemMasterTask').and.returnValues(of(response));
      service.submitTask([{ itemPguid: 'abc', clusterId: 'xyz' }], 'unpredicted');
      expect(wbSwagger.submitItemMasterTask).toHaveBeenCalled();
    }
  ));

  it(`'submitTask' should have called 'wbSwagger.submitUNSPSCReclassifiedObject' for reclassification task`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'submitUNSPSCReclassifiedObject').and.returnValues(of(response));
      service.submitTask([{ itemPguid: 'abc', clusterId: 'xyz' }], 'reclassification');
      expect(wbSwagger.submitUNSPSCReclassifiedObject).toHaveBeenCalled();
    }
  ));

  it(`'saveForLater' should have called 'wbSwagger.itemMastersaveForLater'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'itemMastersaveForLater').and.returnValues(of(response));
      service.saveForLater([{ itemPguid: 'abc', clusterId: 'xyz' }], 'unpredicted');
      expect(wbSwagger.itemMastersaveForLater).toHaveBeenCalled();
    }
  ));

  it(`'saveForLater' should have called 'wbSwagger.reclassificationSaveForLater' for reclassification task`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'reclassificationSaveForLater').and.returnValues(of(response));
      service.saveForLater([{ itemPguid: 'abc', clusterId: 'xyz' }], 'reclassification');
      expect(wbSwagger.reclassificationSaveForLater).toHaveBeenCalled();
    }
  ));

  it(`'getUnmasteredRecords' should have called 'wbSwagger.getUnspscUnmasteredRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: {
            list: [{ itemPguid: 'abc', clusterId: 1, productDesc: 'xyz' }],
            totalRecords: 1
          },
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getUnspscUnmasteredRecords').and.returnValues(of(response));
      service.getUnmasteredRecords({
        groupName: 'UM_Group_1',
        distributorPguid: 1,
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getUnspscUnmasteredRecords).toHaveBeenCalled();
    }
  ));

  it(`'getUnmasteredRecords' should called 'wbSwagger.getAllItemsForUNSPSCReclassification' for reclasified task`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: {
            list: [{ itemPguid: 'abc', clusterId: 1, productDesc: 'xyz' }],
            totalRecords: 1
          },
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getAllItemsForUNSPSCReclassification').and.returnValues(of(response));
      service.getUnmasteredRecords({
        groupName: 'RC_Group_1',
        distributorPguid: 1,
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getAllItemsForUNSPSCReclassification).toHaveBeenCalled();
    }
  ));

  it(`'getAllItemMasteredRecords' should have called 'wbSwagger.getAllUnspscMasterRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getAllUnspscMasterRecords').and.returnValues(of(response));
      service.getAllItemMasteredRecords({
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getAllUnspscMasterRecords).toHaveBeenCalled();
    }
  ));

  it(`'getAllUnspscRecords' should have called 'wbSwagger.getAllUnspscLibrary'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getAllUnspscLibrary').and.returnValues(of(response));
      service.getAllUnspscRecords('Manufacturer');
      expect(wbSwagger.getAllUnspscLibrary).toHaveBeenCalled();
    }
  ));

  it(`'getMasteredMapIDChangeLog' should have called 'wbSwagger.getChangeLogForUnspsc'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getChangeLogForUnspsc').and.returnValues(of(response));
      service.getMasteredMapIDChangeLog({ id: 1 });
      expect(wbSwagger.getChangeLogForUnspsc).toHaveBeenCalled();
    }
  ));

  it(`'updateMasteredRecord' should have called 'wbSwagger.updateUnspscMasteredRecord'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'updateUnspscMasteredRecord').and.returnValues(of(response));
      service.updateMasteredRecord({ id: 1 });
      expect(wbSwagger.updateUnspscMasteredRecord).toHaveBeenCalled();
    }
  ));

  it(`'getUNSPSCForTreeView' should have called 'wbSwagger.getUNSPSCForTreeView'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getUNSPSCForTreeView').and.returnValues(of(response));
      service.getUNSPSCForTreeView({
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getUNSPSCForTreeView).toHaveBeenCalled();
    }
  ));

  it(`'getUNSPSCSearchForTreeView' should have called 'wbSwagger.getUNSPSCSearchForTreeView'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getUNSPSCSearchForTreeView').and.returnValues(of(response));
      service.getUNSPSCSearchForTreeView({
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getUNSPSCSearchForTreeView).toHaveBeenCalled();
    }
  ));

  it(`'getItemPguidByUnspsc' should have called 'wbSwagger.getItemPguidByUnspsc'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          ontologyItemPguid: '123',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getItemPguidByUnspsc').and.returnValues(of(response));
      service.getItemPguidByUnspsc({ code: '10101010', level: 'segment', view: 'basic' });
      expect(wbSwagger.getItemPguidByUnspsc).toHaveBeenCalled();
    }
  ));
});
