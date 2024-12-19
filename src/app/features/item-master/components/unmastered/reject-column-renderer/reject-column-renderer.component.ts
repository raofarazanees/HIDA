import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-reject-column-renderer',
  templateUrl: './reject-column-renderer.component.html',
  styleUrls: ['./reject-column-renderer.component.scss']
})
export class RejectColumnRendererComponent implements ICellRendererAngularComp {
  private params: any;
  data: any;
  checked: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.data = params.data;
    this.checked = params.data?.clientCorrectionAction === 'Reject';
  }

  onChange(): void {
    this.params.onRejectChanged(this.checked);
  }

  onRejectedInfoClick(): any {
    if (this.data.isClientCorrectionRejected !== 'Y') {
      return true;
    }
    this.params.onRejectedInfoClick();
  }

  refresh(params): boolean {
    return true;
  }
}
