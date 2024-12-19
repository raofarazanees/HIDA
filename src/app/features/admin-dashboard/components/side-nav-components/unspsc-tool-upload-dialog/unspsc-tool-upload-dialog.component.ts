import { Component, OnInit } from '@angular/core';
import { ApplicationState } from '@app-store';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { UploadASPFile, UploadUNSPSCWorkFlowFile } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { GetProductStagingLoading } from '../../../store/selectors';
import { GenericWidgetModal } from '../../../modal/generic-widget-interface';

@Component({
  selector: 'app-unspsc-tool-upload-dialog',
  templateUrl: './unspsc-tool-upload-dialog.component.html',
  styleUrls: ['../uom-upload-dialog/uom-upload-dialog.component.scss']
})
export class UnspscToolUploadDialogComponent implements OnInit {
  widget:GenericWidgetModal | any;
  public readonly destroyed$ = new Subject<boolean>();
  base_url:string = window.location.href;
  fileValidation: UploadFileValidation;

  constructor(private readonly store: Store<DashboardState>, private readonly appStore:Store<ApplicationState>) {
   
  }

  ngOnInit() {
     this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `UNSPSC_Parameters_`,
        fileNameShouldHave: `UNSPSC_Parameters_`,
        submitBtnText:'Submit File'
      };
  }

  onSubmit(data): void {
      this.store.dispatch(UploadUNSPSCWorkFlowFile({payload:data}));
  }

  
}
