import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-radio-button-renderer',
  templateUrl: './radio-button-renderer.component.html',
  styleUrls: ['./radio-button-renderer.component.scss']
})
export class RadioButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  status: string;
  radioValue: string;
  radioName: string;
  isGroupRendered: boolean = true;
  agInit(params: any): void {
    this.params = params;
    this.status = params.value;

    if(this.params?.colDef?.headerName == 'Approve' || this.params?.colDef?.headerName == 'Reject') {
      this.isGroupRendered = false;
      this.radioValue = (this.params.colDef.headerName == 'Approve') ? 'A' : 'R';
      this.radioName = `${params.rowIndex}_${params.data.productID}`;
    }
  }

  onChange(event): void {
    const rowNode = this.params.api.getRowNode(this.params.node.id);
    rowNode.setData({ ...rowNode.data, ...{ status: event.value } });
  }

  refresh(params): boolean {
    return true;
  }

}
