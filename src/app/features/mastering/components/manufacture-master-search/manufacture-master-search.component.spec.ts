/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ManufactureMasterSearchComponent } from './manufacture-master-search.component';
import { of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LoaderComponent, ModuleLandingPageComponent } from '@app-shared-components';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CreateParentManfDialogComponent } from './create-parent-manf-dialog/create-parent-manf-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('ManufactureMasterSearchComponent', () => {
  let component: ManufactureMasterSearchComponent;
  let fixture: ComponentFixture<ManufactureMasterSearchComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ManufactureMasterSearchComponent,CreateParentManfDialogComponent, LoaderComponent, ModuleLandingPageComponent],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule,MatDialogModule],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        },
        {
          provide : MAT_DIALOG_DATA,
          useValue : {}
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureMasterSearchComponent);
    component = fixture.componentInstance;
    component.selectedTab = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('masteredRecords tab selection should work', () => {
    component.onTabChange({ index: 4 } as MatTabChangeEvent);
    expect(component.selectedTab).toBe(4);
  });

  it('Page Size 20 when selected 0', () => {
    component.changePaginationSize(0);
    fixture.detectChanges();
    expect(component.pageSize).toBe(20);
  });

  it('Page Size 50 when selected 50', () => {
    component.changePaginationSize(50);
    fixture.detectChanges();
    expect(component.pageSize).toBe(50);
  });

  xit('should call openDialog', () => {
    component.userProfile = {userName:'Mock UserName'}
    const expected_header = "Create Parent Manufacturer";
    fixture.detectChanges();
    const popUpHeader = document.getElementsByTagName('h2')[0] as HTMLHeadElement;
    expect(popUpHeader.innerText).toEqual(expected_header);
  })
});
