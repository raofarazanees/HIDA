import { UploadProductMergeUnmergedGraphFile } from './../../../store/actions/common.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardState } from '../../../store/reducers';
import { getProductManageGraphUploading } from '../../../store/selectors';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { ApplicationState, getAppEnv } from '@app-store';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-graph-upload-dialog',
  templateUrl: './product-graph-upload-dialog.component.html',
  styleUrls:['./product-graph-upload-dialog.component.scss']
})
export class ProductGraphUploadDialogComponent implements OnInit {
  env:string ='';
  public readonly destroyed$ = new Subject<boolean>();

  fileValidation: UploadFileValidation = {
    loadingState$: this.store.select(getProductManageGraphUploading),
    fileName: `HIDA_Graphs_Products_Items_UP_`,
    fileNameShouldHave: `HIDA_Graphs_Products_Items_UP_`
  };

  constructor(private readonly store: Store<DashboardState>, private readonly appStore:Store<ApplicationState>) {}

  ngOnInit() {
    this.getAppRunningEnv()
  }

  onSubmit(data): void {
    this.store.dispatch(new UploadProductMergeUnmergedGraphFile(data));
  }

  private getAppRunningEnv() {
    const base_url = window.location.href;
    if(base_url.includes('-dev.dev')) {
        this.env = 'dev';
    } else if(base_url.includes('-int.int')) {
      this.env = 'int';
    } else if(base_url.includes('-uat.uat')) {
      this.env = 'uat';
    } else if(base_url.includes('-prod.prod')) {
      this.env = 'prod';
    }  else {
      this.env = 'dev';
    }
    console.log('env',this.env)
  
  }
  
}
