import { BrandMasterEffects } from './brand-master.effects';
import { FacilityMasterEffects } from './facility-master.effects';
import { ToolsFilterEffects } from './manf-master.effects';
import { ProductEntitlementEffects } from './product-entitlement.effects';
import { UnspscMasterEffects } from './unspsc-master.effects';
import { ZipMasterEffects } from './zip-master.effects';

export const effects: any[] = [ToolsFilterEffects,UnspscMasterEffects, FacilityMasterEffects,BrandMasterEffects,ProductEntitlementEffects,ZipMasterEffects];
export * from './manf-master.effects'
export * from './unspsc-master.effects'
export * from './facility-master.effects'
export * from './brand-master.effects'
export * from './product-entitlement.effects'