import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { components } from './components';
import { directives } from './directives';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonUploadFileDialogComponent } from './shared/common-upload-file-dialog/common-upload-file-dialog.component';
import { SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker-ext'
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { reducers as marketReducer } from '../mastering/store/reducers';
import { effects as marketEffects } from '../mastering/store/effects';


@NgModule({
  declarations: [...components, ...directives],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature(effects),
    EffectsModule.forFeature(marketEffects),
    StoreModule.forFeature('toolsAndFilters', marketReducer), 
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    SatDatepickerModule,
    SatNativeDateModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports:[CommonUploadFileDialogComponent]
})
export class AdminDashboardModule {}
