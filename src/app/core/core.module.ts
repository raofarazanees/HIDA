import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AnalyticsModule } from '@cdx/analytics';
import { AuthenticationModule } from '@cdx/authentication';

import { APP_NAME, CoreConfig, REFERRER } from './core.config';
import { CoreHttpInterceptorProviders } from './core-http-interceptor.providers';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule.forRoot({
      appName: APP_NAME,
      referrer: REFERRER
    }),
    AnalyticsModule.forRoot({
      appId: APP_NAME
    })
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the Root Module only');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [CoreConfig, CoreHttpInterceptorProviders]
    };
  }
}
