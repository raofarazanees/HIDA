import { ConfirmationEffects } from './confirmation.effects';
import { PairingEffects } from './pairing.effects';
import { GraphsEffects } from './graph.effects';
import { StagingCurationEffects } from './staging-curation.effects';


export const effects: any[] = [PairingEffects, ConfirmationEffects, GraphsEffects, StagingCurationEffects];

export * from './pairing.effects';
export * from './confirmation.effects';
export * from './graph.effects';
export * from './staging-curation.effects';
