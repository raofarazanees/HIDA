import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationState, getUserProfile, getRouteState } from '@app-store';
import { Store } from '@ngrx/store';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { BaseContainer } from '../../item-to-product/containers/base.container';

@Component({
  selector: 'app-tools-filter-base',
  templateUrl: './tools-filter-base.component.html',
  styleUrls: ['./tools-filter-base.component.scss']
})
export class ToolsFilterBaseComponent extends BaseContainer implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly appStore: Store<ApplicationState>) {
    super();
  }

  ngOnInit() {
    combineLatest([this.appStore.select(getUserProfile), this.appStore.select(getRouteState)])
      .pipe(
        takeUntil(this.destroyed$),
        filter(([userProfile]) => userProfile !== null)
      )
      .subscribe(([userProfile, routeState]: any) => {
        BaseContainer.prototype['userProfile'] = {
          isExceptionLead: !!userProfile.itemToProductRoles.filter(
            (role: any) => role === 'Mastering_ExceptionLead' || role === 'Mastering_WFadmin'
          ).length,
          userName: userProfile.fullName,
          email: userProfile.email,
          routeState: routeState
        };
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
