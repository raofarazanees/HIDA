import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelDialogueComponent } from './model-dialogue.component';

describe('ModelDialogueComponent', () => {
  let component: ModelDialogueComponent;
  let fixture: ComponentFixture<ModelDialogueComponent>;
  const dialogMock = {
    close: () => {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ModelDialogueComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { message: 'test', isConfirm: true }
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'onSubmit' should have called 'dialogRef.close'`, inject([MatDialogRef], (dialogRef: MatDialogRef<ModelDialogueComponent>) => {
    spyOn(dialogRef, 'close');
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalled();
  }));

  it(`'onCancel' should have called 'dialogRef.close'`, inject([MatDialogRef], (dialogRef: MatDialogRef<ModelDialogueComponent>) => {
    spyOn(dialogRef, 'close');
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  }));
});
