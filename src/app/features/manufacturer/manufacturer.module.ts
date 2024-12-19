import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../../shared/shared.module';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { components } from './components';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  imports: [SharedModule, ManufacturerRoutingModule, EffectsModule.forFeature(effects), StoreModule.forFeature('manufacturer', reducers)],
  declarations: [components]
})
export class ManufacturerModule {}
