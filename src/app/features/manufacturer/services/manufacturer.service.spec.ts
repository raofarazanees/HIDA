import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { WorkbenchSwaggerService } from 'src/app/swagger';

import { ManufacturerService } from './manufacturer.service';

describe('ManufacturerService', () => {
  let service: ManufacturerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ManufacturerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'updateManufacturer' should have called 'wbSwagger.submitManufacturerRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'submitManufacturerRecords').and.returnValues(of(response));
      service.updateManufacturer([{ externalManufacturerKey: 'abc', manufacturerInternalId: 'xyz' }]);
      expect(wbSwagger.submitManufacturerRecords).toHaveBeenCalled();
    }
  ));

  it(`'saveForLater' should have called 'wbSwagger.manufacturerSaveForLater'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'manufacturerSaveForLater').and.returnValues(of(response));
      service.saveForLater([{ externalManufacturerKey: 'abc', manufacturerInternalId: 'xyz' }]);
      expect(wbSwagger.manufacturerSaveForLater).toHaveBeenCalled();
    }
  ));

  it(`'getUnmasteredRecords' should have called 'wbSwagger.getManufacturerUnmasteredRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: {
            list: [{ externalManufacturerKey: 'abc', manufacturerInternalId: 1, internalManufacturerDesc: 'xyz' }],
            totalRecords: 1
          },
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getManufacturerUnmasteredRecords').and.returnValues(of(response));
      service.getUnmasteredRecords({
        distributorPguid: 1,
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getManufacturerUnmasteredRecords).toHaveBeenCalled();
    }
  ));

  it(`'getTotalMappedRecordsCount' should have called 'wbSwagger.getMappedRecordsCount'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          recordCount: 10,
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getMappedRecordsCount').and.returnValues(of(response));
      service.getTotalMappedRecordsCount(1);
      expect(wbSwagger.getMappedRecordsCount).toHaveBeenCalled();
    }
  ));

  it(`'getMasteredManufacturerList' should have called 'wbSwagger.getManufacturerMasterRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getManufacturerMasterRecords').and.returnValues(of(response));
      service.getMasteredManufacturerList({
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getManufacturerMasterRecords).toHaveBeenCalled();
    }
  ));

  it(`'getAllMasterValues' should have called 'wbSwagger.getInternalFieldsForMapping'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getInternalFieldsForMapping').and.returnValues(of(response));
      service.getAllMasterValues('Manufacturer');
      expect(wbSwagger.getInternalFieldsForMapping).toHaveBeenCalled();
    }
  ));

  it(`'getMasteredMapIDChangeLog' should have called 'wbSwagger.getChangeLogForManufacturer'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getChangeLogForManufacturer').and.returnValues(of(response));
      service.getMasteredMapIDChangeLog({ id: 1 });
      expect(wbSwagger.getChangeLogForManufacturer).toHaveBeenCalled();
    }
  ));

  it(`'updateMasteredRecord' should have called 'wbSwagger.updateManufacturerMasteredRecord'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'updateManufacturerMasteredRecord').and.returnValues(of(response));
      service.updateMasteredRecord({ id: 1 });
      expect(wbSwagger.updateManufacturerMasteredRecord).toHaveBeenCalled();
    }
  ));
});
