import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasteringRoutingModule } from './mastering-routing.module';
import { components } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PatchFormGroupValuesDirective } from './directive/patch-form-value.directive';
import {MatChipsModule} from '@angular/material/chips';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { InputRefDirective } from './directive/input-trim.directive';
import {CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { NumbersOnlyDirective } from './directive/number-only.directive';
import { SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker-ext'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonUploadFileDialogComponent } from '../admin-dashboard/shared/common-upload-file-dialog/common-upload-file-dialog.component';

@NgModule({
  declarations: [...components,PatchFormGroupValuesDirective,InputRefDirective,NumbersOnlyDirective],
  imports: [
    CommonModule,
    MasteringRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatChipsModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature('toolsAndFilters', reducers), 
    CdkScrollableModule,
    ScrollingModule,
    SatNativeDateModule,
    SatDatepickerModule,
    MatProgressSpinnerModule
  ],

})
export class MasteringModule { }
