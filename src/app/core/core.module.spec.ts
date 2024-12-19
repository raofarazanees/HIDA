import { CoreModule } from './core.module';
import { Inject } from '@angular/core';

describe('Core Module', () => {
  it('should throw an error if already imported', () => {
    expect(() => new CoreModule(Inject(CoreModule))).toThrow(new Error('CoreModule is already loaded. Import it in the Root Module only'));
  });
});
