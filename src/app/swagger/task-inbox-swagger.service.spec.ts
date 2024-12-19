import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskInboxSwaggerService } from 'src/app/swagger';

describe('TaskInboxSwaggerService', () => {
  let service: TaskInboxSwaggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskInboxSwaggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'getTaskDetails' should have called 'http.get'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'get').and.returnValues(of(response));
    service.getTaskDetails('1', '1');
    expect(http.get).toHaveBeenCalled();
  }));

  it(`'updateTaskDetails' should have called 'http.put'`, inject([HttpClient], (http: HttpClient) => {
    const response = {
      status: 200,
      body: {
        data: 'test result',
        message: 'Success'
      }
    };
    spyOn(http, 'put').and.returnValues(of(response));
    service.updateTaskDetails({ taskId: 1, status: 'completed' });
    expect(http.put).toHaveBeenCalled();
  }));
});
