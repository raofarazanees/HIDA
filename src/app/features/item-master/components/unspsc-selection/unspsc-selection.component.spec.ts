import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { UnspscSelectionComponent } from './unspsc-selection.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UnspscSelectionComponent', () => {
  let component: UnspscSelectionComponent;
  let fixture: ComponentFixture<UnspscSelectionComponent>;

  const dialogMock = {
    close: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnspscSelectionComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, MatDialogModule,MatIconModule,FormsModule,ReactiveFormsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'Test profuct description'
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnspscSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeDialogRef should call dialogRef.close method', () => {
    const mockData = {
      unspscCode: '53102903',
      segmentCode: '53000000',
      segmentTitle: 'Apparel and Luggage and Personal Care Products',
      familyCode: '53100000',
      familyTitle: 'Clothing',
      classCode: '53102900',
      classTitle: 'Athletic wear',
      commodityCode: '53102903',
      commodityTitle: 'Boys athletic wear',
      internalItemKey: 'urn:onto:247084'
    };
    spyOn(dialogMock, 'close');
    component.closeDialogRef(mockData);
    expect(dialogMock.close).toHaveBeenCalledWith();
  });

  it('closeDialogRef should call dialogRef.close with undefined param', () => {
    spyOn(dialogMock, 'close');
    component.closeDialogRef();
    expect(dialogMock.close).toHaveBeenCalledWith();
  });

  it('changeView should update the view type', () => {
    component.changeView('TABLE');
    expect(component.view).toBe('TABLE');
  });
});
