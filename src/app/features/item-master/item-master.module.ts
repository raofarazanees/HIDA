import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../../shared/shared.module';

import { components } from './components';
import { ItemMasterRoutingModule } from './item-master-routing.module';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { MessageService } from 'src/app/shared/services';
@NgModule({
  declarations: [components],
  imports: [SharedModule, ItemMasterRoutingModule, EffectsModule.forFeature(effects), StoreModule.forFeature('item-master', reducers)],
  providers: [MessageService]
})
export class ItemMasterModule {}
