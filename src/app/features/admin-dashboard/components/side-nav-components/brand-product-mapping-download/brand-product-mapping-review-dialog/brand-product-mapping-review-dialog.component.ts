import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileState, ApplicationState, getUserProfile } from '@app-store';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { CloseDrawerAt, CloseDialogAt, DownloadProductBrandFile, DownloadProductBrandFileSuccess } from '../../../../store/actions';
import { DashboardState } from '../../../../store/reducers';
import { closeDialogAt, getProductBrandLoadingState } from '../../../../store/selectors';
import { ForProductBrandTaggingReview } from '../../../../modal/product-brand-tagging_constants';

@Component({
  selector: 'app-brand-product-mapping-review-dialog',
  templateUrl: './brand-product-mapping-review-dialog.component.html',
  styleUrls: ['./brand-product-mapping-review-dialog.component.scss']
})
export class BrandProductMappingReviewDialogComponent implements OnInit {
  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Items For Product...</span>';
  gridApi: GridApi;
  rowCount: number = 0;
  gridOptions: GridOptions = ForProductBrandTaggingReview(30);
  private readonly destroyed$ = new Subject<boolean>();
  loading$: Observable<any> = this.store.select(getProductBrandLoadingState);
  profile: UserProfileState;

  constructor(
    private readonly store: Store<DashboardState>,
    private readonly appStore: Store<ApplicationState>,
    public dialogRef: MatDialogRef<BrandProductMappingReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productBrandData: any,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.appStore
      .select(getUserProfile)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((profile: UserProfileState) => {
        this.profile = profile;
      });

    this.store
      .select(closeDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((time: any) => time)
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(new CloseDrawerAt(new Date().getTime()));
        }, 200);
      });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.productBrandData.data);
    this.cd.markForCheck();
  }

  downloadGraphItemFile() {
    const dataToPostFile = {
      initiatedByUserName: this.profile.fullName,
      productIDs: this.productBrandData.data.map((data) => data.productID)
    };
    this.store.dispatch(DownloadProductBrandFile({ payload: dataToPostFile }));
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new CloseDialogAt(0));
    this.store.dispatch(DownloadProductBrandFileSuccess({payload:null}));
  }

  closeDialog() {
    this.dialogRef.close({userClose:true});
  }
}
