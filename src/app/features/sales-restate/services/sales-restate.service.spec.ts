import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { WorkbenchSwaggerService } from 'src/app/swagger';
import { SalesRestateService } from './sales-restate.service';

describe('SalesRestateService', () => {
  let service: SalesRestateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SalesRestateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'submitData' should have called 'wbSwagger.submitSalesRestateData'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: 'test result',
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'submitSalesRestateData').and.returnValues(of(response));
      service.submitData([{ revenue: 100, sku: 'abc', itemKey: 'xyz', status: 'A' }]);
      expect(wbSwagger.submitSalesRestateData).toHaveBeenCalled();
    }
  ));

  it(`'getAllRestateRecords' should have called 'wbSwagger.getAllRestateRecords'`, inject(
    [WorkbenchSwaggerService],
    (wbSwagger: WorkbenchSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: {
            salesRestateList: [{ revenue: 100, sku: 'abc', itemKey: 'xyz' }],
            totalRecords: 1
          },
          message: 'Success'
        }
      };
      spyOn(wbSwagger, 'getAllRestateRecords').and.returnValues(of(response));
      service.getAllRestateRecords({
        distributorPguid: 1,
        limit: 10,
        offset: 0,
        searchCriteria: [],
        sortCriteria: []
      });
      expect(wbSwagger.getAllRestateRecords).toHaveBeenCalled();
    }
  ));
});
