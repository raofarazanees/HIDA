import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { WorkbenchSwaggerService } from 'src/app/swagger';
import { FacilityTypeService } from './facility-type.service';

describe('FacilityTypeService', () => {
  let service: FacilityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FacilityTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'submitTask' should have called 'wbSwagger.submitFacilityTask'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'submitFacilityTask').and.returnValues(of(response));
      service.submitTask([{ externalFacilityKey: 'abc', facilityInternalId: 'xyz' }]);
      expect(wbSwagger.submitFacilityTask).toHaveBeenCalled();
    }
  ));

  it(`'saveForLater' should have called 'wbSwagger.facilitySaveForLater'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'facilitySaveForLater').and.returnValues(of(response));
      service.saveForLater([{ externalFacilityKey: 'abc', facilityInternalId: 'xyz' }]);
      expect(wbSwagger.facilitySaveForLater).toHaveBeenCalled();
    }
  ));

  it(`'getUnmasteredRecords' should have called 'wbSwagger.getFacilityUnmasteredRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: {
            list: [{ externalFacilityKey: 'abc', facilityInternalId: 1 }],
            totalRecords: 1
          },
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getFacilityUnmasteredRecords').and.returnValues(of(response));
      service.getUnmasteredRecords({
        distributorPguid: 1,
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getFacilityUnmasteredRecords).toHaveBeenCalled();
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

  it(`'getMasteredRecords' should have called 'wbSwagger.getFacilityMasteredRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getFacilityMasteredRecords').and.returnValues(of(response));
      service.getMasteredRecords({
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getFacilityMasteredRecords).toHaveBeenCalled();
    }
  ));

  it(`'getAllMappingValues' should have called 'wbSwagger.getInternalFieldsForMapping'`, inject(
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
      service.getAllMappingValues('Facility');
      expect(wbSwagger.getInternalFieldsForMapping).toHaveBeenCalled();
    }
  ));

  it(`'getMasteredMapIDChangeLog' should have called 'wbSwagger.getChangeLogForFacility'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getChangeLogForFacility').and.returnValues(of(response));
      service.getMasteredMapIDChangeLog({ id: 1 });
      expect(wbSwagger.getChangeLogForFacility).toHaveBeenCalled();
    }
  ));

  it(`'updateMasteredRecord' should have called 'wbSwagger.updateFacilityMasteredRecord'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'updateFacilityMasteredRecord').and.returnValues(of(response));
      service.updateMasteredRecord({ id: 1 });
      expect(wbSwagger.updateFacilityMasteredRecord).toHaveBeenCalled();
    }
  ));

  it(`'getMappingValue' method should returns 'internalFacilityGroupDesc | internalFacilitySubgroupDesc'`, () => {
    const item = {
      internalFacilityGroupDesc: 'group',
      internalFacilitySubgroupDesc: 'sub-group'
    };
    expect(service.getMappingValue(item)).toBe('group | sub-group');
  });

  it(`'getMappingValue' method should return empty string if internalFacilityGroupDesc and internalFacilitySubgroupDesc is null`, () => {
    const item = {
      internalFacilityGroupDesc: null,
      internalFacilitySubgroupDesc: null
    };
    expect(service.getMappingValue(item)).toBe('');
  });

  it(`'getMappingValue' method should return only internalFacilityGroupDesc if internalFacilitySubgroupDesc is null`, () => {
    const item = {
      internalFacilityGroupDesc: 'group',
      internalFacilitySubgroupDesc: null
    };
    expect(service.getMappingValue(item)).toBe('group');
  });
});
