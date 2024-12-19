import { ProductSearchCriteria, searchCriteriaInternal } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { EditComponent } from './../../../../manufacturer/components/mastered/edit/edit.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { productInfoUpdate } from '../product-entitlement-management.component';
import { ProductDetailsViewComponent } from '../product-details-view/product-details-view.component';
import { ProductEntitlementState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { getDuplicateProductRecords, productManfSkuDuplicateRecords, updateProductInformationRecords, updateProductInformationRecordsFail } from '../../../store/actions';
import { Observable } from 'rxjs';
import { GetLoadingStateProduct } from '../../../store/selectors/product-entitlement.selector';

@Component({
  selector: 'app-product-mnf-sku-info-dialog',
  templateUrl: './product-mnf-sku-info-dialog.component.html',
  styleUrls: ['./product-mnf-sku-info-dialog.component.scss']
})
export class ProductMnfSkuInfoDialogComponent implements OnInit {
  loading$: Observable<boolean> = this.productStore.select(GetLoadingStateProduct);
  dataToPost: ProductSearchCriteria = ProductSearchCriteria.default();

  constructor(
    public dialogRef: MatDialogRef<ProductMnfSkuInfoDialogComponent>,
    private modelRef: MatDialog,
    private readonly productStore: Store<ProductEntitlementState>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      initiatedByUserEmail: string;
      initiatedByUserName: string;
      editedRecords: productInfoUpdate;
      duplicatesRecords: Array<{ manfSKU: string; productIDs: number[] }>;
    }
  ) {}

  ngOnInit() {
    this.dataToPost.initiatedByUserEmail = this.data.initiatedByUserEmail;
    this.dataToPost.initiatedByUserName = this.data.initiatedByUserName;
    this.dataToPost.searchCondition = 'AND';
    this.dataToPost.userRole = 'ADMIN';
  }

  viewProducts(item): void {
    const dataToPost = JSON.parse(JSON.stringify(this.dataToPost));
    dataToPost.searchCriteria = [{ columnName: 'product_id', searchText: item.productIDs.toString() }];
    this.productStore.dispatch(getDuplicateProductRecords({ payload: dataToPost }));
    this.modelRef.open(ProductDetailsViewComponent, {
      width: '100%',
      data: { title: item.manfSKU },
      position: { top: '10px' },
      height: '94vh',
      maxHeight: '94vh',
      maxWidth: '98vw',
      disableClose: true
    });
  }
  proceedWithUpdate() {
    const data = JSON.parse(JSON.stringify(this.data.editedRecords));
    data.manfSKUCheck = 'N';
    this.productStore.dispatch(updateProductInformationRecords({ payload: data }));
  }

  closeDialog() {
    this.dialogRef.close(true)
    this.productStore.dispatch(productManfSkuDuplicateRecords({payload:null}));
  }
}
