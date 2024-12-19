import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthGuard } from './guards/auth-guard.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { AppComponent } from './app.component';
import { APP_NAME } from './core/core.config';
import { AppRoutesModule } from './app-routing.module';
import { AuthGuardClear } from './guards/auth-guard-clean.service';
import { ItemToProductGraphDetailsComponent } from './features/mastering/components/product-entitlement-management/item-to-product-graph-details/item-to-product-graph-details.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutesModule,
    CoreModule.forRoot(),
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  declarations: [AppComponent, ItemToProductGraphDetailsComponent],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    AuthGuardClear,
    {
      provide: APP_BASE_HREF,
      useValue: `/${APP_NAME}/`
    }
  ]
})
export class AppModule {}
