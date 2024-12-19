import { CoreConfig } from './core.config';

describe('CoreConfig', () => {
  const APP_ID = 'hida';
  let config: CoreConfig;

  beforeEach(() => {
    config = new CoreConfig();
  });

  it('should have the expected appName', () => {
    expect(config.appName).toBe(APP_ID);
  });

  it('should have the expected referrer', () => {
    expect(config.referrer).toBe(`/${APP_ID}/home`);
  });
});
