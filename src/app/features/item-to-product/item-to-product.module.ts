import { NgModule } from '@angular/core';

import { ItemToProductRoutingModule } from './item-to-product-routing.module';
import { components } from './components';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { effects } from './store/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { effects as MasterEffect } from '../item-master/store/effects';
import { reducers as MasterReducer} from '../item-master/store/reducers';
@NgModule({
  declarations: [...components],
  imports: [ItemToProductRoutingModule, SharedModule, EffectsModule.forFeature(effects), StoreModule.forFeature('itemToProduct', reducers), EffectsModule.forFeature(MasterEffect), StoreModule.forFeature('item-master', MasterReducer)]
})
export class ItemToProductModule {}
