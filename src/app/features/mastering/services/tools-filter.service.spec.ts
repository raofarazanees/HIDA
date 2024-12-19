/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ToolsFilterService } from './tools-filter.service';
import { WorkbenchSwaggerService } from '@app-swagger';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
const SUCCESS_RES = {  data: [{ id: 1 }], message: 'Success'}

xdescribe('Service: ToolsFilter', () => {
  let service: ToolsFilterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [ToolsFilterService]
    });
    service = TestBed.inject(ToolsFilterService);

  });

  it('should ...', inject([ToolsFilterService], (service: ToolsFilterService) => {
    expect(service).toBeTruthy();
  }));

  // it(`'retrieveControlledMasterSearchRecords' should have called 'wbSwagger.retrieveControlledMasterSearchRecords'`, inject(
  //   [WorkbenchSwaggerService],
  //   (wbSwagger: WorkbenchSwaggerService) => {
  //     spyOn(wbSwagger, 'retrieveControlledMasterSearchRecords').and.returnValues(of(SUCCESS_RES));
  //     service.retrieveControlledMasterSearchRecords({ id: 1 });
  //     expect(wbSwagger.retrieveControlledMasterSearchRecords).toHaveBeenCalled();
  //   }
  // ));

  // it(`'retrieveMasterMappedSearchRecords' should have called 'wbSwagger.retrieveMasterMappedSearchRecords'`, inject(
  //   [WorkbenchSwaggerService],
  //   (wbSwagger: WorkbenchSwaggerService) => {
  //     spyOn(wbSwagger, 'retrieveMasterMappedSearchRecords').and.returnValues(of(SUCCESS_RES));
  //     service.retrieveMasterMappedSearchRecords({ id: 1 });
  //     expect(wbSwagger.retrieveMasterMappedSearchRecords).toHaveBeenCalled();
  //   }
  // ));
  
});
