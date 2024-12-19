import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from './../../shared/shared.module';
import { FacilityTypeRoutingModule } from './facility-type-routing.module';
import { components } from './components';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
@NgModule({
  declarations: [...components],
  imports: [FacilityTypeRoutingModule, SharedModule, EffectsModule.forFeature(effects), StoreModule.forFeature('facility', reducers)]
})
export class FacilityTypeModule {}
