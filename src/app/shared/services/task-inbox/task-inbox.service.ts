import { Injectable } from '@angular/core';
import { TaskInboxSwaggerService } from 'src/app/swagger/task-inbox-swagger.service';

@Injectable({
  providedIn: 'root'
})
export class TaskInboxService {
  constructor(private taskInboxSwagger: TaskInboxSwaggerService) {}

  getTaskDetails(taskId: string, workflowId: string): any {
    return this.taskInboxSwagger.getTaskDetails(taskId, workflowId);
  }

  updateTaskDetails(taskdetails: any): any {
    return this.taskInboxSwagger.updateTaskDetails(taskdetails);
  }
}
