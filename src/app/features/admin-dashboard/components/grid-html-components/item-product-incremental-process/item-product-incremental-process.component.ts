import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApplicationState, getUserProfile, UserProfileState } from '@app-store';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserInitiatedData } from '../../../modal/user-initiated-interface';
import { ItemToProductIncrementalProcess, StagingCurationTriggerOutboundProcess, TriggerBrandAutomationDAG } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { I2POutboundSnowFlakeRefresh } from '../../../store/actions';

@Component({
  selector: 'app-item-product-incremental-process',
  templateUrl: './item-product-incremental-process.component.html',
  styleUrls: ['./item-product-incremental-process.component.scss']
})
export class ItemProductIncrementalProcessComponent implements OnInit, OnDestroy {
  @Input() widget: any;
  private readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly store: Store<DashboardState>, private readonly appStore: Store<ApplicationState>) {}
  profile: UserProfileState;
  userInitData:UserInitiatedData;
  ngOnInit() {
    this.appStore
      .select(getUserProfile)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((profile: UserProfileState) => {
        this.profile = profile;
        this.userInitData = { initiatedByUserEmail: this.profile.email, initiatedByUserName: this.profile.fullName };

      });
  }

  startIncrementProcess() {
    this.store.dispatch(ItemToProductIncrementalProcess({ payload: this.userInitData }));
  }

  startOutBoundRefresh() {
    this.store.dispatch(I2POutboundSnowFlakeRefresh({ payload: this.userInitData }));
  }
  
  triggerStagingOutboundProcess() {
    this.store.dispatch(StagingCurationTriggerOutboundProcess({ payload: this.userInitData }));
  }

  triggerBrandAirflowProcess() {
    this.store.dispatch(TriggerBrandAutomationDAG({ payload: this.userInitData }));
  }

  
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
