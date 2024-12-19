import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ItemToProductGraphDetailsComponent } from './item-to-product-graph-details.component';

describe('ItemToProductGraphDetailsComponent', () => {
  let component: ItemToProductGraphDetailsComponent;
  let fixture: ComponentFixture<ItemToProductGraphDetailsComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemToProductGraphDetailsComponent ],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore(),
        { provide: MatDialog, useValue: {} }, // Mock MatDialog
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provide mock data for MAT_DIALOG_DATA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemToProductGraphDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();  // Run change detection to apply the data
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});