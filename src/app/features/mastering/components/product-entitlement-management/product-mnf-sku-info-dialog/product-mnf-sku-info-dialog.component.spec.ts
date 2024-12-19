/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductMnfSkuInfoDialogComponent } from './product-mnf-sku-info-dialog.component';

xdescribe('ProductMnfSkuInfoDialogComponent', () => {
  let component: ProductMnfSkuInfoDialogComponent;
  let fixture: ComponentFixture<ProductMnfSkuInfoDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMnfSkuInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMnfSkuInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
