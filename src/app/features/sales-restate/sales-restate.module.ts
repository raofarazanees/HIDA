import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../../shared/shared.module';

import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { SalesRestateRoutingModule } from './sales-restate-routing.module';
import { components } from './components';

@NgModule({
  declarations: [components],
  imports: [SharedModule, SalesRestateRoutingModule, EffectsModule.forFeature(effects), StoreModule.forFeature('salesRestate', reducers)]
})
export class SalesRestateModule {}
