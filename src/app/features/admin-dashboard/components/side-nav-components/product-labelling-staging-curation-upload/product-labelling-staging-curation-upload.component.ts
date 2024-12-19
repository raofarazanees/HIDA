import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { ProductStagingUploadFile, ProductStagingUploadFileForLabelling } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { GetProductStagingLoading } from '../../../store/selectors';
import { ApplicationState, getAppEnv } from '@app-store';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-labelling-staging-curation-upload',
  templateUrl: './product-labelling-staging-curation-upload.component.html',
  styleUrls:['./product-labelling-staging-curation-upload.component.scss']
})
export class ProductLabellingStagingCurationUploadComponent implements OnInit {
  widget:any;
  fileValidation: UploadFileValidation;
  tooltipText = 's - product_id, unspsc, and analyst_comments.'
  env:string ='';
  public readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly store: Store<DashboardState>, private readonly appStore:Store<ApplicationState>,private cd:ChangeDetectorRef) {}

  ngOnInit() {
    this.getAppRunningEnv();
    if(!this.widget.alternateSideNav) {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `HIDA_Staging_Curation_Product_With_UNSPSC_Labels_UP_`,
        fileNameShouldHave: `HIDA_Staging_Curation_Product_With_UNSPSC_Labels_UP_`,
      };
    } else {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `HIDA_Staging_Curation_Product_For_UNSPSC_Labelling_UP_`,
        fileNameShouldHave: `HIDA_Staging_Curation_Product_For_UNSPSC_Labelling_UP_`,
      };
      this.tooltipText = ' - product_id.'
      this.cd.detectChanges();
    }
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  onSubmit(data): void {
    if(!this.widget.alternateSideNav){
     this.store.dispatch(ProductStagingUploadFile({ payload: data }));
    } else {
     this.store.dispatch(ProductStagingUploadFileForLabelling({ payload: data }));

    }
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
    this.cd.detectChanges();
  }

}
