import { ProductStagingCreateTask, ProductStagingDownloadFile } from './../../../../store/actions/product-staging.action';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileState, ApplicationState, getUserProfile } from '@app-store';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent, IsRowSelectable } from 'ag-grid-community';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { ForProductStagingReview } from 'src/app/features/admin-dashboard/modal/product-staging.modal';
import { UserInitiatedData } from 'src/app/features/admin-dashboard/modal/user-initiated-interface';
import { CloseDialogAt, CloseDrawerAt } from 'src/app/features/admin-dashboard/store/actions';
import { DashboardState } from 'src/app/features/admin-dashboard/store/reducers';
import { closeDialogAt, GetProductStagingLoading } from 'src/app/features/admin-dashboard/store/selectors';
import { MessageService } from 'src/app/shared/services';

@Component({
  selector: 'app-product-staging-review-records',
  templateUrl: './product-staging-review-records.component.html',
  styleUrls: ['./product-staging-review-records.component.scss']
})
export class ProductStagingReviewRecordsComponent implements OnInit {
  overlayLoadingForGraph: string = '<span class="ag-overlay-loading-center">Fetching Items For Product...</span>';
  gridApi: GridApi;
  rowCount: number = 0;
  gridOptions: GridOptions = ForProductStagingReview(30);
  private readonly destroyed$ = new Subject<boolean>();
  loading$: Observable<any> = this.store.select(GetProductStagingLoading);
  profile: UserProfileState;
  public rowSelection: 'single' | 'multiple' = 'multiple';

  constructor(
    private readonly store: Store<DashboardState>,
    public dialogRef: MatDialogRef<ProductStagingReviewRecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public productStagingData: any,
    private readonly cd: ChangeDetectorRef,
    private msg: MessageService,
    private readonly appStore: Store<ApplicationState>
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
  public isRowSelectable: IsRowSelectable = (rowNode: any) => {
    return true;
  };

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.productStagingData.data);
    this.cd.markForCheck();
  }

  onSelectionChanged(e) {
    //
  }

  createTaskForSelectedItem() {
    if (this.gridApi.getSelectedRows().length > 0) {
      const productIDs = this.gridApi.getSelectedRows().map((row) => row.productID);
      const dataToPost: dataRequest = { initiatedByUserName: this.profile.fullName, initiatedByUserEmail: this.profile.email, productIDs };
      this.store.dispatch(ProductStagingCreateTask({ payload: dataToPost }));
    } else {
      this.msg.showToast('Please select product to create an task', 'warn');
    }
  }

  downloadProductStagingFile() {
    if (this.gridApi.getSelectedRows().length > 0) {
      const productIDs = this.gridApi.getSelectedRows().map((row) => row.productID);
      const dataToPost: dataRequest = { initiatedByUserName: this.profile.fullName, productIDs };
      this.store.dispatch(ProductStagingDownloadFile({ payload: dataToPost }));
    } else {
      this.msg.showToast('Please select product to download file', 'warn');
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new CloseDialogAt(0));
  }

  closeDialog() {
    this.dialogRef.close({ userClose: true });
  }
}

interface dataRequest extends UserInitiatedData {
  productIDs: (number | string)[];
}
