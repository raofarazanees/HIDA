/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrandFeatureSuggestionComponent } from './brand-feature-suggestion.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

xdescribe('BrandFeatureSuggestionComponent', () => {
  let component: BrandFeatureSuggestionComponent;
  let fixture: ComponentFixture<BrandFeatureSuggestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule,ReactiveFormsModule,MatAutocompleteModule,MatButtonModule],
      declarations: [BrandFeatureSuggestionComponent],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandFeatureSuggestionComponent);
    component = fixture.componentInstance;
    component.allActiveMarket = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
