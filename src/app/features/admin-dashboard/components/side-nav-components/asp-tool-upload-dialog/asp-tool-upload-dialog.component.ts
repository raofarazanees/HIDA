import { SkuDataForClusteringFileUpload, UoMAdhocFileUpload } from './../../../store/actions/product-staging.action';
import { Component, OnInit } from '@angular/core';
import { ApplicationState } from '@app-store';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { UomRegularFileUpload, UploadASPFile } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { GetProductStagingLoading } from '../../../store/selectors';
import { GenericWidgetModal } from '../../../modal/generic-widget-interface';

@Component({
  selector: 'app-asp-tool-upload-dialog',
  templateUrl: './asp-tool-upload-dialog.component.html',
  styleUrls: ['../uom-upload-dialog/uom-upload-dialog.component.scss']
})
export class AspToolUploadDialogComponent implements OnInit {
  widget: GenericWidgetModal | any;
  env: string = '';
  public readonly destroyed$ = new Subject<boolean>();
  fileValidation: UploadFileValidation;
  csvTemplate: { csvName: string; csvTemplateUrl: string };
  constructor(private readonly store: Store<DashboardState>, private readonly appStore: Store<ApplicationState>) {}

  ngOnInit() {
    if (this.widget?.alternateSideNav) {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `HIDA_UOM_Regular_`,
        fileNameShouldHave: `HIDA_UOM_Regular_`,
        submitBtnText: 'Submit File'
      };
      this.csvTemplate = { csvName: this.widget?.config.csvNameSec, csvTemplateUrl: this.widget?.config.csvTemplateUrlSec };
    } else if (this.widget?.isAdHocUploader) {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `HIDA_UOM_Adhoc_`,
        fileNameShouldHave: `HIDA_UOM_Adhoc_`,
        submitBtnText: 'Submit File'
      };
      this.csvTemplate = { csvName: this.widget?.config.adHocCsvName, csvTemplateUrl: this.widget?.config.adHocCsvTemplateUrl };
    } else if (this.widget?.isSkuDataForClusteringUploader) {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `taxonomy_review_`,
        fileNameShouldHave: `taxonomy_review_`,
        submitBtnText: 'Submit File'
      };
      this.csvTemplate = { csvName: this.widget?.config.skuCsvName, csvTemplateUrl: this.widget?.config.skuCsvTemplateUrl };
    } else {
      this.fileValidation = {
        loadingState$: this.store.select(GetProductStagingLoading),
        fileName: `ASP_Parameters_`,
        fileNameShouldHave: `ASP_Parameters_`,
        submitBtnText: 'Submit File'
      };
      this.csvTemplate = { csvName: this.widget?.config.csvName, csvTemplateUrl: this.widget?.config.csvTemplateUrl };
    }
  }

  onSubmit(data): void {
    if (this.widget?.alternateSideNav) {
      this.store.dispatch(UomRegularFileUpload({ payload: data }));
    } else if (this.widget?.isAdHocUploader) {
      this.store.dispatch(UoMAdhocFileUpload({ payload: data }));
    } else if (this.widget?.isSkuDataForClusteringUploader) {
      this.store.dispatch(SkuDataForClusteringFileUpload({ payload: data }));
    } else this.store.dispatch(UploadASPFile({ payload: data }));
  }
}
