import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DownloadUOMDataFile, WidgetSelectionChange } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';

@Component({
  selector: 'app-generic-widget',
  templateUrl: './generic-widget.component.html',
  styleUrls: ['./generic-widget.component.scss']
})
export class GenericWidgetComponent implements OnInit {
  @Input() widget: any;
  docPGUID:string = ''
  appUrl:string = window.top.location.href;

 constructor(private readonly store: Store<DashboardState>) { }

  ngOnInit() { 
   
    const urlParams = this.appUrl.split('?');
    if(urlParams.length > 1 && this.widget.key === 'uom_file_upload') {
     const params = new URLSearchParams(urlParams[1]);
     this.docPGUID = params.get('docPGUID') ? params.get('docPGUID') : '';
   }
  }

  updateWidgetSelection(command?:string) {
    const data = JSON.parse(JSON.stringify(this.widget));
    command && command !== 'adHocUploader' ? (data.alternateSideNav = true) : (data.alternateSideNav = false);
    command && command === 'adHocUploader' ? (data.isAdHocUploader = true) : (data.isAdHocUploader = false) 
    this.store.dispatch(new WidgetSelectionChange(data));
  }

  updateWidgetSelectionForGeneric() {
    (this.widget.key !== 'uom_file_upload') 
    ? this.store.dispatch(new WidgetSelectionChange({ ...this.widget, genericBtnAction: true })) :
      this.downloadUOMDataCSV()
  }

  updateWidgetSelectionForSKU() {
    const data = JSON.parse(JSON.stringify(this.widget));
    data.isSkuDataForClusteringUploader = true; 
    this.store.dispatch(new WidgetSelectionChange(data));
  }

  get isDisabled(): boolean {
    return (this.widget.key !== 'uom_file_upload') ? false : this.docPGUID ? false : true;
  }
  uploadFileHistory() {
    this.store.dispatch(new WidgetSelectionChange({ ...this.widget, bottom: true }));
  }

  downloadUOMDataCSV() {
    const data = {docPGUID:this.docPGUID,initiatedByUserEmail:this.widget?.config?.userEmail,initiatedByUserName:this.widget?.config?.userName}
    this.store.dispatch(new DownloadUOMDataFile(data));
  }
}
