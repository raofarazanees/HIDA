import { UploadProductAttributeTagFile } from './../../../store/actions/common.actions';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApplicationState, getUserProfile, UserProfileState } from '@app-store';
import { Store } from '@ngrx/store';
import { Papa } from 'ngx-papaparse';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DashboardState } from '../../../store/reducers';
import { getProductAttributeFileUploadLoading } from '../../../store/selectors';

@Component({
  selector: 'app-product-attribute-upload-dialog',
  templateUrl: './product-attribute-upload-dialog.component.html',
  styleUrls: ['./product-attribute-upload-dialog.component.scss']
})
export class ProductAttributeUploadDialogComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  loading$: Observable<any> = this.store.select(getProductAttributeFileUploadLoading);
  file: File;
  fileRules: any = this.defaultFileRules();
  isValidFile: boolean = false;
  profile: UserProfileState;
  parseInfo: any;
  showParsingLoader: boolean = false;

  private readonly destroyed$ = new Subject<boolean>();

  constructor(private papa: Papa, private readonly store: Store<DashboardState>, private readonly appStore: Store<ApplicationState>) {}

  ngOnInit(): void {
    this.appStore
      .select(getUserProfile)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((profile: UserProfileState) => {
        this.profile = profile;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    if (this.validateFileRules(this.file)) {
      this.isValidFile = true;
      setTimeout(() => this.parseCsvFile());
    } else {
      this.isValidFile = false;
    }
  }

  clearFileSelected(): void {
    this.fileUpload.nativeElement.value = '';
    this.file = null;
    this.isValidFile = false;
    this.parseInfo = undefined;
    this.fileRules = this.defaultFileRules();
  }

  parseCsvFile() {
    this.showParsingLoader = true;
    let options = {
      complete: (results: any) => {
        this.parseInfo = {
          results,
          size: this.formatBytes(this.file.size)
        };
        this.showParsingLoader = false;
      },
      skipEmptyLines: true,
      header: true,
      worker: true,
      fastMode: true
    };
    this.papa.parse(this.file, options);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('payload', `{"initiatedByUserName": "${this.profile.fullName}", "initiatedByUserEmail": "${this.profile.email}"}`);
    this.store.dispatch(new UploadProductAttributeTagFile(formData));
  }

  private defaultFileRules(): any {
    return {
      format: undefined,
      size: undefined,
      name: undefined
    };
  }

  private validateFileRules(file: any): boolean {
    this.fileRules.format = this.validateExtension(file.name);
    this.fileRules.size = this.validateSize(file.size);
    this.fileRules.name = this.validateNaming(file.name);
    return this.fileRules.format && this.fileRules.size && this.fileRules.name;
  }

  private validateExtension(name: string): boolean {
    const supportedExt = ['csv'];
    var ext = name.substring(name.lastIndexOf('.') + 1);
    return supportedExt.includes(ext.toLowerCase());
  }

  private validateSize(fileSize: number): boolean {
    const fileSizeInMB = Math.round(fileSize / 1024 / 1024);
    return fileSizeInMB < 25;
  }

  private validateNaming(name: string): boolean {
    return new RegExp('^HIDA_Product_Attribute_Tagging_UP_[a-z]{1,8}$', 'gi').test(name.split('.')[0]);
  }

  private formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
