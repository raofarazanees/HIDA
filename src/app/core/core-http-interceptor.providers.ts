import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoCacheInterceptor } from '@cdx/services/interceptors';
import { WorkbenchNoRepeatProvider } from './norepeat-http-interceptor.providers';

// Export all http-interceptor providers here.
// Angular applies interceptors in the order that you provide them. If you provide interceptors A,
// then B, then C, requests will flow in A->B->C and responses will flow out C->B->A
export const CoreHttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NoCacheInterceptor,
    multi: true
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: WorkbenchNoRepeatProvider,
  //   multi: true
  // },
];
