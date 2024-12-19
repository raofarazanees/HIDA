import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-circular-progressbar-renderer',
  templateUrl: './circular-progressbar-renderer.component.html',
  styleUrls: ['./circular-progressbar-renderer.component.scss']
})
export class CircularProgressbarRendererComponent implements ICellRendererAngularComp {
  params: any;
  score: string = '0';
  scoreColour: string;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    if (params.data) {
      const score = Math.ceil(params.data[this.params.score] * 100);
      this.score = Math.ceil(params.data[this.params.score] * 100).toString();
      this.scoreColour = '--fg: ' + (score <= 50 ? '#dc3545' : score <= 75 ? '#ffc107' : '#4caf50');
    }
  }

  refresh(): boolean {
    return false;
  }
}
