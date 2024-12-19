import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
const taskLevelRendering = ['taskLevelRecords_1','taskLevelRecords'];
@Component({
  selector: 'app-checkbox-button-renderer',
  templateUrl: './checkbox-button-renderer.component.html',
  styleUrls: ['./checkbox-button-renderer.component.scss']
})
export class CheckboxButtonRendererComponent implements ICellRendererAngularComp {

  params: any;
  status: string;
  value: string;
  name: string;
  selectionColor:ThemePalette = 'primary';
  isForReview: boolean = false;
  agInit(params: any): void {

    this.params = params;
    this.status = params.value;
    if(this.params.column.colId === 'isReviewed') {
      this.name = `${params.rowIndex}_isReviewed`;
      this.value = 'Y';
      this.isForReview = true;
    } else {
    if(taskLevelRendering.includes(this.params.column.colId)) {
      this.value = (this.params.colDef.headerName == 'Approve') ? 'A' : 'N';
    } else {
      this.value = (this.params.colDef.headerName == 'Approve') ? 'A' : 'R';
    }
    this.selectionColor = (this.params.colDef.headerName == 'Approve') ? 'primary' : 'warn';
    this.name = `${params.rowIndex}_${params.data.productID}`;
  }
  }

  onChange(event): void {
    let value = '';
    if(taskLevelRendering.includes(this.params.column.colId)) {
      value = event.checked ? event.source.value : ''
    } else {
      value = event.checked ? event.source.value : 'N'
    }

    const rowNode = this.params.api.getRowNode(this.params.node.id);
    if(this.isForReview) {
      this.status =  event.checked ? 'Y' : 'N';
      this.value =  this.status;
      rowNode.setData({ ...rowNode.data, ...{ isReviewed: this.value} });
    } else  {
      rowNode.setData({ ...rowNode.data, ...{ status: value,rejectReason: '',isModified: event.checked } });
    }
  }

  refresh(params): boolean {
    return true;
  }

}
