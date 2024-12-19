import { filter, takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { ApplicationState, getUserProfile, getRouteState } from 'src/app/store';
import { BaseContainer } from '../containers/base.container';

@Component({
  selector: 'app-item-to-product',
  templateUrl: './item-to-product.component.html',
  styleUrls: ['./item-to-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemToProductComponent extends BaseContainer implements OnInit, OnDestroy {
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
