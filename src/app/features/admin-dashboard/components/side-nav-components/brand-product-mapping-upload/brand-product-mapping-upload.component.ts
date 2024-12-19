import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { BrandProductMappingUpload } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { getBrandLoadingState } from '../../../store/selectors';

@Component({
  selector: 'app-brand-product-mapping-upload',
  templateUrl: './brand-product-mapping-upload.component.html'
})
export class BrandProductMappingUploadComponent implements OnInit {

  fileValidation: UploadFileValidation = {
    loadingState$: this.store.select(getBrandLoadingState),
    fileName: 'HIDA_Product_Brand_Tagging_UP_',
    fileNameShouldHave: 'HIDA_Product_Brand_Tagging_UP_[a-z]{1,8}$'
  };

  constructor(private readonly store: Store<DashboardState>) {}

  ngOnInit() {}

  onSubmit(data): void {
    this.store.dispatch(BrandProductMappingUpload({ payload: data }));
  }
}
