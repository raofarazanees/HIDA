import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskInboxSwaggerService } from 'src/app/swagger';

import { TaskInboxService } from './task-inbox.service';

describe('TaskInboxService', () => {
  let service: TaskInboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskInboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'getTaskDetails' should have called 'taskInboxSwagger.getTaskDetails'`, inject(
    [TaskInboxSwaggerService],
    (taskInboxSwagger: TaskInboxSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(taskInboxSwagger, 'getTaskDetails').and.returnValues(of(response));
      service.getTaskDetails('1', '1');
      expect(taskInboxSwagger.getTaskDetails).toHaveBeenCalled();
    }
  ));

  it(`'updateTaskDetails' should have called 'taskInboxSwagger.updateTaskDetails'`, inject(
    [TaskInboxSwaggerService],
    (taskInboxSwagger: TaskInboxSwaggerService) => {
      const response = {
        status: 200,
        body: {
          data: [{ id: 1 }],
          message: 'Success'
        }
      };
      spyOn(taskInboxSwagger, 'updateTaskDetails').and.returnValues(of(response));
      service.updateTaskDetails({ taskId: 1, status: 'completed' });
      expect(taskInboxSwagger.updateTaskDetails).toHaveBeenCalled();
    }
  ));
});
