import { Component, OnInit } from '@angular/core';
import { ApplicationState } from '@app-store';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { UomCorrectionFileUpload, UomRegularFileUpload, UploadProductMergeUnmergedGraphFile } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { GetProductStagingLoading } from '../../../store/selectors';

@Component({
  selector: 'app-uom-upload-dialog',
  templateUrl: './uom-upload-dialog.component.html',
  styleUrls: ['./uom-upload-dialog.component.scss']
})
export class UomUploadDialogComponent implements OnInit {

  widget:any;
  env:string ='';
  public readonly destroyed$ = new Subject<boolean>();
  base_url:string = window.location.href;
  fileValidation: UploadFileValidation;

  constructor(private readonly store: Store<DashboardState>, private readonly appStore:Store<ApplicationState>) {
   
  }

  ngOnInit() {
    this.getAppRunningEnv();
    if(!this.widget.alternateSideNav) {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `HIDA_UOM_Regular_`,
        fileNameShouldHave: `HIDA_UOM_Regular_`,
        submitBtnText:'Submit File'
      };
    } else {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `HIDA_UOM_Correction_UP_`,
        fileNameShouldHave: `HIDA_UOM_Correction_UP_`,
        submitBtnText:'Submit File'
      };
     // this.tooltipText = 'product_id is mandatory columns. The rest of the columns/headers should be in CSV format.'
    }
  }

  onSubmit(data): void {
    if(!this.widget.alternateSideNav){
      this.store.dispatch(UomRegularFileUpload({payload:data}));
    } else {
      this.store.dispatch(UomCorrectionFileUpload({payload:data}));
     }
  }

  private getAppRunningEnv() {
   
    if(this.base_url.includes('-dev.dev')) {
        this.env = 'dev';
    } else if(this.base_url.includes('-int.int')) {
      this.env = 'int';
    } else if(this.base_url.includes('-uat.uat')) {
      this.env = 'uat';
    } else if(this.base_url.includes('-prod.prod')) {
      this.env = 'prod';
    }  else {
      this.env = 'dev';
    }
  
  }
  
}
