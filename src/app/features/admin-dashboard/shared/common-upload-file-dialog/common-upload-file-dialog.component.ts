import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApplicationState, getUserProfile, UserProfileState } from '@app-store';
import { Store } from '@ngrx/store';
import { Papa } from 'ngx-papaparse';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FileSelectorValidation } from 'src/app/features/interface/file-constants';
import { UploadFileValidation } from '../../../interface/upload-file-validation';
import { UploadProductMergeUnmergedGraphFile } from '../../store/actions';
import { getProductManageGraphUploading } from '../../store/selectors';
@Component({
  selector: 'app-common-upload-file-dialog',
  templateUrl: './common-upload-file-dialog.component.html',
})
export class CommonUploadFileDialogComponent implements OnInit {

  @Input() FileValidation:UploadFileValidation;
  @Input() docPGUID?:string;
  @Output() uploadFileData = new EventEmitter<any>();
  
  @ViewChild('fileUpload') fileUpload: ElementRef;
  loading$: Observable<any>
  file: File;
  fileRules: any = this.defaultFileRules();
  isValidFile: boolean = false;
  profile: UserProfileState;
  parseInfo: any;
  showParsingLoader: boolean = false;
  env:string = '';
  private readonly destroyed$ = new Subject<boolean>();
  
  constructor(private papa: Papa,  private readonly appStore: Store<ApplicationState>, private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAppRunningEnv();
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
        this.cd.detectChanges();
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
    const payloadData:any = {"initiatedByUserName": this.profile.fullName, "initiatedByUserEmail": this.profile.email};
    (this.docPGUID) ? ( payloadData.docPGUID = this.docPGUID) : '';
    formData.append('payload', JSON.stringify(payloadData));
    this.uploadFileData.emit(formData);
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
    const supportedExt = FileSelectorValidation.fileSupportedExt;
    var ext = name.substring(name.lastIndexOf('.') + 1);
    return supportedExt.includes(ext.toLowerCase());
  }

  private validateSize(fileSize: number): boolean {
    const fileSizeInMB = Math.round(fileSize / 1024 / 1024);
    const maxSize = this.FileValidation.maxUploadFileSize || FileSelectorValidation.fileMaxSize;
    return fileSizeInMB < maxSize;
  }

  //HIDA_Graphs_Products_Items_UP_[a-z]{1,8}$
  private validateNaming(name: string): boolean {
    return new RegExp(`^${this.FileValidation.fileNameShouldHave}.csv`, 'gi').test(name);
  }

  private formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = FileSelectorValidation.fileSize;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
    
    this.FileValidation.fileName = `${this.FileValidation.fileName}${this.env}`;
    this.FileValidation.fileNameShouldHave = `${this.FileValidation.fileNameShouldHave}${this.env}`;
    this.cd.detectChanges();
  
  }
}
