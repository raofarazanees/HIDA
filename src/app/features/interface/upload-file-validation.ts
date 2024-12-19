import { Observable } from "rxjs";

export interface UploadFileValidation {
fileNameShouldHave: string;
fileName: string;
loadingState$: Observable<any>,
maxUploadFileSize?: number,
submitBtnText?: string;
}