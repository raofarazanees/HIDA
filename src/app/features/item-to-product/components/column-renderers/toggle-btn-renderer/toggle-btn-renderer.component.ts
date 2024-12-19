import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-toggle-btn-renderer',
  templateUrl: './toggle-btn-renderer.component.html',
  styleUrls: ['./toggle-btn-renderer.component.scss']
})
export class ToggleButtonRendererComponent implements ICellRendererAngularComp {
  params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onChange(value: any): void {
    this.params.api.closeToolPanel();
    this.params.node.setExpanded(false);
    setTimeout(() => {
      (this.params as any).onChange(this.params.node, {
        ...this.params.data,
        [this.params.colDef.field]: value,
        isModified: value !== this.params.data[this.params['refKey']]
      });
    }, 200);
  }

  refresh(): boolean {
    return true;
  }
}
