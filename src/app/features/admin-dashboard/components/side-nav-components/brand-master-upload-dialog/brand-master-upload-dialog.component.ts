import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBrandLoadingState } from './../../../store/selectors/brand.selector';
import { BrandMasterCV } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';

@Component({
  selector: 'app-brand-master-upload-dialog',
  templateUrl: './brand-master-upload-dialog.component.html',
})
export class BrandMasterUploadDialogComponent implements OnInit {

  fileValidation: UploadFileValidation = {
    loadingState$: this.store.select(getBrandLoadingState),
    fileName: 'HIDA_Brand_Master_UP_',
    fileNameShouldHave: 'HIDA_Brand_Master_UP_[a-z]{1,8}'
  };

  constructor(private readonly store: Store<DashboardState>) {}

  ngOnInit(): void {  }

  onSubmit(data): void {
    this.store.dispatch(BrandMasterCV({payload:data}));
  }

}
