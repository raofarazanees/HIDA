import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ManufacturerComponent } from './manufacturer.component';
import { MatIconModule } from '@angular/material/icon';

describe('ManufacturerComponent', () => {
  let component: ManufacturerComponent;
  let fixture: ComponentFixture<ManufacturerComponent>;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufacturerComponent],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, MatDialogModule,MatIconModule],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('masteredRecords tab selection should work', () => {
    component.onTabChange({ index: 1 } as MatTabChangeEvent);
    expect(component.selectedTab).toBe('masteredRecords');
  });

  it('unmasteredRecords tab selection should work', () => {
    component.onTabChange({ index: 0 } as MatTabChangeEvent);
    expect(component.selectedTab).toBe('unmasteredRecords');
  });
});
