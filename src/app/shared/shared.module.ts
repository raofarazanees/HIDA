import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnalyticsModule } from '@cdx/analytics';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfileModule } from '@sgty/services/userprofile';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GridsterModule } from 'angular-gridster2';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {CdkScrollableModule} from '@angular/cdk/scrolling';

import { components } from './components';

import { pipes } from './pipes';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  ClipboardModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule,
  AnalyticsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTreeModule,
  MatProgressBarModule,
  UserProfileModule,
  MatTabsModule,
  MatRadioModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSidenavModule,
  GridsterModule,
  MatBottomSheetModule,
  MatStepperModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  CdkScrollableModule
];

@NgModule({
  declarations: [...pipes, ...components],
  imports: [...modules, AgGridModule.withComponents([])],
  exports: [...modules, AgGridModule, ...pipes, ...components]
})
export class SharedModule {}
