import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-action-cell',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.scss']
})
export class AgGridActionCellComponent implements ICellRendererAngularComp {
  currentNode: any = {};
  data: any;
  actions: any = {
    isExceptionLead: false,
    isEditEnabled:true,
    isActionRenderForAllRecords: false,
    isPIMScreen:false
  };

  agInit(params: any): void {
    this.data = params.data;
    this.currentNode = params.api.getRowNode(params.node.id);
    this.actions = {
      isExceptionLead: params.isExceptionLead,
      onEditClick: params.onEditClick,
      onLogClick: params.onLogClick,
      onI2PClick: params.onI2PClick,
      onDetailsClick: params.onDetailsClick,
      isEditEnabled:params?.isEditEnabled  === false ? params?.isEditEnabled : true,
      isActionRenderForAllRecords: params.isActionRenderForAllRecords,
      isPIMScreen: params.isPIMScreen

    };
  }

  refresh(params?: any): boolean {
    return true;
  }
}
