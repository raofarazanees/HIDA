import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AutocompleteWrapperComponent } from './autocomplete-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('AutocompleteWrapperComponent', () => {
  let component: AutocompleteWrapperComponent;
  let fixture: ComponentFixture<AutocompleteWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule,MatFormFieldModule,ReactiveFormsModule,FormsModule,MatInputModule],
      declarations: [AutocompleteWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteWrapperComponent);
    component = fixture.componentInstance;
    component.optionList = [
      {
        id: 1,
        value: 'abc'
      },
      {
        id: 2,
        value: 'xyz'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDisplayValue method should returns corrent display value', () => {
    expect(component.getDisplayValue({ id: 2, value: 'xyz' })).toBe('xyz');
  });

  it('trackByID method should returns id property value', () => {
    expect(component.trackByID(1, { id: 2, value: 'xyz' })).toBe(2);
  });

  it('onSelectionChanged should update previous value', () => {
    component.control.setValue({ id: 1, value: 'test' });
    component.onSelectionChanged();
    expect(component.previousValue.value).toBe('test');
  });

  it(`'onInputClick' should have called 'dialogRef.close'`, () => {
    spyOn(component.control, 'reset');
    component.onInputClick();
    expect(component.control.reset).toHaveBeenCalled();
  });

  it('mappingOptions should filter by serach text', () => {
    // @ts-ignore
    const filteredList = component.filterMappings({ value: 'ab' });
    expect(filteredList.length).toBe(1);
  });

  it('should return all mappingOptions for clear search text', () => {
    // @ts-ignore
    const filteredList = component.filterMappings('');
    expect(filteredList.length).toBe(2);
  });

  it('sortBystring method should work as expected', () => {
    // @ts-ignore
    expect(component.sortBystring({ value: 'abc' }, { value: 'abef' })).toBe(-1);
  });
});
