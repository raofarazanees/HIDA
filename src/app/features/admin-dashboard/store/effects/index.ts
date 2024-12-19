import { ProductStagingEffect } from './product-staging.effects';
import { BrandEffects } from './brand.effects';
import { CommonEffects } from './common.effects';
import { I2PEffect } from './I2P.effects'
export const effects: any[] = [CommonEffects,I2PEffect, BrandEffects, ProductStagingEffect];

export * from './common.effects';
export * from './I2P.effects';
export * from './brand.effects';
export * from './product-staging.effects';
