import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ApplicationState,
  getActiveDistributorPguid,
  getDistributors,
  getLoadingState,
  getTaskDetails,
  getUpdatingTaskState,
  getUserProfile
} from './../../../store';

import { getOntologyMappings } from '../store/selectors';
import { FacilityTypeState } from '../store/reducers';
import { GetOntologyMappings } from '../store/actions';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseContainer } from '../containers/base.container';

@Component({
  selector: 'app-facility-type',
  templateUrl: './facility-type.component.html',
  styleUrls: ['./facility-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacilityTypeComponent extends BaseContainer implements OnInit, OnDestroy {
  selectedTab = 'unmasteredRecords';
  taskDetails: any = null;
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  taskUpdating$: Observable<any> = this.appStore.select(getUpdatingTaskState);
  activeDistributorPguid$: Observable<number> = this.appStore.select(getActiveDistributorPguid);
  distributors$: Observable<any> = this.appStore.select(getDistributors);
  ontologyMappings$: Observable<any> = this.store.select(getOntologyMappings);
  userProfile$: Observable<any> = this.appStore.select(getUserProfile);
  private readonly destroyed$ = new Subject<boolean>();
  isExceptionLead: boolean = false;

  constructor(private readonly appStore: Store<ApplicationState>, private readonly store: Store<FacilityTypeState>) {
    super();
  }

  ngOnInit(): void {
    this.appStore
      .select(getTaskDetails)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== null)
      )
      .subscribe((data) => {
        this.taskDetails = JSON.parse(JSON.stringify(data));
        this.store.dispatch(new GetOntologyMappings('FacilityType'));
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onTabChange(event: any) {
    this.selectedTab = event.index === 1 ? 'masteredRecords' : 'unmasteredRecords';
  }

  checkExceptionLeadPermission(itemMasterRoles: string[]) {
    this.isExceptionLead = !!itemMasterRoles.filter((role: any) => role === 'Mastering_ExceptionLead' || role === 'Mastering_WFadmin')
      .length;
  }
}
