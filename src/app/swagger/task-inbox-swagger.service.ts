import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskInboxSwaggerService {
  constructor(protected readonly http: HttpClient) {}

  getTaskDetails(taskId: string, workflowId: string) {
    return this.http.get(`${environment.taskInboxUrl}/${workflowId}/tasks/${taskId}`);
  }

  updateTaskDetails(taskdetails: any) {
    return this.http.put(`${environment.taskInboxUrl}`, taskdetails);
  }
}
