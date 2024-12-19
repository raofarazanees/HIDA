import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { BrandMasterCV, ProductLevelClusteringFileUpload } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { getBrandLoadingState, GetProductStagingLoading } from '../../../store/selectors';
import { ApplicationState, getAppEnv } from '@app-store';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { GetLoadingStateProduct } from 'src/app/features/mastering/store/selectors/product-entitlement.selector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-level-clustering-upload',
  templateUrl: './product-level-clustering-upload.component.html',
  styleUrls:['../product-labelling-staging-curation-upload/product-labelling-staging-curation-upload.component.scss']
})
export class ProductLevelClusteringUploadComponent implements OnInit {
  env:string ='';
  fileValidation: UploadFileValidation = {
    loadingState$: this.store.select(GetProductStagingLoading),
    fileName: `HIDA_Product_UNSPSC_Labelling_UP_`,
    fileNameShouldHave: `HIDA_Product_UNSPSC_Labelling_UP_`,
  };
  public readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly store: Store<DashboardState>, private readonly appStore: Store<ApplicationState>, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAppRunningEnv();
  }

  onSubmit(data): void {
    this.store.dispatch(ProductLevelClusteringFileUpload({ payload: data }));
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
