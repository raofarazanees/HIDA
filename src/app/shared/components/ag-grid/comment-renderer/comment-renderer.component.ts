import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-comment-renderer',
  templateUrl: './comment-renderer.component.html',
  styleUrls: ['./comment-renderer.component.scss']
})
export class CommentRendererComponent implements ICellRendererAngularComp {
  data: any;
  constructor() {}

  agInit(params: any): void {
    this.data = params.data && params.data[params.commentField] ? params.data[params.commentField] : '';
  }

  refresh(params?: any): boolean {
    return true;
  }
}
