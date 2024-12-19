import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState, ClearStoreOnDeactive } from './../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardClear implements CanDeactivate<any> {
  constructor(private readonly appStore: Store<ApplicationState>) {}

  canDeactivate(): boolean {
    this.appStore.dispatch(new ClearStoreOnDeactive());
    return true;
  }
}
