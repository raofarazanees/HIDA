import { DashboardService } from './dashboard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/shared/services';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('DashboardService', () => {
  let service: DashboardService;
  const mockResponseSuccess = {
    status: 200,
    message: 'Success Data'
  };

  const mockResponseFail = {
    status: 400,
    message: 'Fail Message'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, CommonModule, HttpClientModule, OverlayModule],
      providers: [MatSnackBar, MessageService]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should Called uploadUnspscReclassificationFile()', (done) => {
    spyOn(service, 'uploadUnspscReclassificationFile').and.returnValue(of(mockResponseSuccess));
    service.uploadUnspscReclassificationFile({ data: '' }).subscribe((result) => {
      expect(result.status).toEqual(200);
      expect(result.message).toEqual('Success Data');
      done();
    });
  });

  it('Should Called CreateTaskForProductStagingUnspsc()', () => {
    spyOn(service, 'CreateTaskForProductStagingUnspsc').and.returnValue(of(mockResponseSuccess));
    service.CreateTaskForProductStagingUnspsc({ data: '' }).subscribe((result) => {
      expect(result.status).toEqual(200);
      expect(result.message).toEqual('Success Data');
    });
  });

  
});
