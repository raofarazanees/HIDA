import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey(
  'CompanyName=Insight (Orem, UT)_on_behalf_of_Clarivate Analytics LLC,LicensedGroup=CDX,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=10,AssetReference=AG-015256,ExpiryDate=28_April_2022_[v2]_MTY1MTEwMDQwMDAwMA==71fbb2c1611a641d0ecdf053c97daab3'
);

if (environment.production) {
  enableProdMode();

  if (window) {
    window.console.log =
      window.console.warn =
      window.console.info =
        () => {
          // Don't log anything.
        };
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
