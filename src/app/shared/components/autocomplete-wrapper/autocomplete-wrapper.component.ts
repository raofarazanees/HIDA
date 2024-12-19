import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-wrapper',
  templateUrl: './autocomplete-wrapper.component.html',
  styleUrls: ['./autocomplete-wrapper.component.scss']
})
export class AutocompleteWrapperComponent implements OnInit {
  previousValue: any;

  _optionList: any[] = [];

  get optionList() {
    return this._optionList;
  }

  @Input() set optionList(data: any[]) {
    this._optionList = data;
  }

  @Input() defaultOption: any = {};
  @Output() onValueChanged = new EventEmitter();

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  @ViewChild('inputElement') inputElement: ElementRef;

  control: FormControl = new FormControl();
  filteredMappingOptions: Observable<any[]>;
  private subscription: Subscription;

  ngOnInit() {
    this.filteredMappingOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.onValueChanged.emit(this.control.value);
        return this.filterMappings(value ? value : '');
      })
    );
    setTimeout(() => {
      this.previousValue = this.defaultOption;
      this.control.setValue(this.defaultOption);
    }, 0);
  }

  getDisplayValue(option: any): string {
    return option && option.value;
  }

  trackByID(index: number, item: any): number {
    return item.id;
  }

  onSelectionChanged(): void {
    if (this.control.value && this.control.value !== null && this.control.value.value) {
      this.previousValue = this.control.value;
      this.onValueChanged.emit(this.control.value);
      this.inputElement.nativeElement.blur();
    }
  }

  onInputClick(): void {
    this.control.reset();
  }

  onElementFocusOut(): void {
    setTimeout(() => {
      if (!(typeof this.control.value === 'object' && this.control.value !== null)) {
        this.control.setValue(this.previousValue);
        this.inputElement.nativeElement.blur();
      }
    }, 500);
  }

  private filterMappings(value: any): any {
    if (typeof value === 'object' && value) {
      value = value.value;
    }
    return this.optionList
      .filter((item) => this.normalizeValue(item.value).includes(this.normalizeValue(value)))
      .sort(this.sortBystring)
      .splice(0, 100);
  }

  private normalizeValue(value: string = ''): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private sortBystring(first, second): any {
    var firstDesc = first.value.toUpperCase();
    var secondDesc = second.value.toUpperCase();
    return firstDesc < secondDesc ? -1 : firstDesc > secondDesc ? 1 : 0;
  }
}
